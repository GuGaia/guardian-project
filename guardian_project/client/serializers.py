from rest_framework import serializers
from .models import Client
import bcrypt

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        validated_data['password'] = hashed.decode('utf-8')
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if password:
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            validated_data['password'] = hashed.decode('utf-8')
        return super().update(instance, validated_data)
