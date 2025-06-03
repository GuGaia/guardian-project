import jwt
import os
from decouple import config

SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def validate_token(token):
    try:
        decoded = jwt.decode(token, config('JWT_SECRET_KEY'), algorithms=['HS256'])
        print('decoded: ', decoded)
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None