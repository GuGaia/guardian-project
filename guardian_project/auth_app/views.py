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

@api_view(['POST'])
def login_view(request):
    try:
        # Debug: verificar tabelas (remover em produção)
#        with connection.cursor() as cursor:
#            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
#            tables = cursor.fetchall()
#            print("Tabelas disponíveis:")
#            for table in tables:
#                print(f"- {table[0]}")

        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password')

        print(f"[DEBUG] Email recebido: {email}")
        print(f"[DEBUG] Tentando buscar no banco...")

        if not email or not password:
            return Response({
                'detail': 'Both email and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Correção principal: usar %s para placeholders no Django
        with connection.cursor() as cursor:
            print("[DEBUG] DB in use:", connection.settings_dict["NAME"])
            cursor.execute(
                "SELECT id, name, email, password, default_message, active, have_plus FROM clients WHERE email = %s", 
                [email]
            )
            user = cursor.fetchone()

        if not user:
            print("[DEBUG] Nenhum usuário encontrado com esse email.")
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

        print("[DEBUG] Usuário encontrado!")
        user_id, name, email, hashed_password, default_message, active, have_plus = user

        print(f"[DEBUG] Hash armazenado: {hashed_password}")
        print(f"[DEBUG] Verificando senha...")
        
        # Tratar diferentes tipos de dados da senha hash
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode('utf-8')

        # Verificar senha
        if not bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            print("[DEBUG] Senha inválida.")
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not active:
            print("[DEBUG] Usuário inativo.")
            return Response({
                'detail': 'Usuário inativo'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        print("[DEBUG] Login bem-sucedido, gerando token...")

        # Gerar JWT
        now = datetime.utcnow()
        expiration = now + timedelta(days=365 * 100)
        payload = {
            'user_id': user_id,
            'id': str(user_id),
            'sub': str(user_id),
            'name': name,
            'email': email,
            'default_message': default_message,
            'active': active,
            'have_plus': have_plus,
            'exp': expiration,
            'token_type': 'access',
            'jti': f"{user_id}_{int(now.timestamp())}",
            'iat': datetime.utcnow()
        }
        
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')

        return Response({
            'token': token,
            'user': {
                'id': user_id,
                'name': name,
                'email': email
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Erro no login: {str(e)}")
        return Response({
            'error': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)