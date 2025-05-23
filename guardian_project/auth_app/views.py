# views.py
import json
import bcrypt
import jwt
import logging
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

logger = logging.getLogger(__name__)

def hash_password(password):
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)

@api_view(['POST'])
def login_view(request):
    logger.info("Login attempt received")
    logger.info(f"Request data: {request.data}")
    
    try:
        # Debug: verificar tabelas (remover em produção)
        with connection.cursor() as cursor:
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = cursor.fetchall()
            logger.info("Available tables:")
            for table in tables:
                logger.info(f"- {table[0]}")

        email = request.data.get('email')
        password = request.data.get('password')

        logger.info(f"Login attempt for email: {email}")

        if not email or not password:
            logger.warning("Missing email or password")
            return Response({
                'detail': 'Both email and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Buscar usuário
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, name, email, password, default_message, active, have_plus FROM clients WHERE email = %s", 
                [email]
            )
            user = cursor.fetchone()

        if not user:
            logger.warning(f"No user found for email: {email}")
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

        user_id, name, email, hashed_password, default_message, active, have_plus = user
        logger.info(f"User found: {name} ({email})")

        try:
            # Tentar verificar a senha
            if isinstance(hashed_password, memoryview):
                hashed_password = bytes(hashed_password)
            elif isinstance(hashed_password, str):
                hashed_password = hashed_password.encode('utf-8')

            # Se a senha não estiver hasheada corretamente, vamos rehashá-la
            if not hashed_password.startswith(b'$2b$'):
                logger.info(f"Rehashing password for user: {email}")
                new_hash = hash_password(password)
                with connection.cursor() as cursor:
                    cursor.execute(
                        "UPDATE clients SET password = %s WHERE id = %s",
                        [new_hash, user_id]
                    )
                hashed_password = new_hash

            # Verificar senha
            if not bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                logger.warning(f"Invalid password for user: {email}")
                return Response({
                    'detail': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            logger.error(f"Password verification error: {str(e)}")
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

        logger.info(f"Password verified for user: {email}")

        # Gerar JWT
        expiration = datetime.utcnow() + timedelta(hours=1)
        payload = {
            'sub': str(user_id),
            'name': name,
            'email': email,
            'default_message': default_message,
            'active': active,
            'have_plus': have_plus,
            'exp': expiration,
            'iat': datetime.utcnow()
        }

        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
        logger.info(f"JWT token generated for user: {email}")

        return Response({
            'token': token,
            'user': {
                'id': user_id,
                'name': name,
                'email': email
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Login error: {str(e)}", exc_info=True)
        return Response({
            'error': 'Internal server error',
            'detail': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)