from django.test import TestCase
from client.models import Client  # ajuste conforme necessário
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
import jwt
from django.conf import settings
from client.serializers import ClientSerializer
import bcrypt
from rest_framework import status
from unittest.mock import patch
from contact.models import Contact

class ClientModelTest(TestCase):

    def setUp(self):
        self.client_data = {
            'name': 'João da Silva',
            'email': 'joao@example.com',
            'password': 'senha_segura_123',
            'default_message': 'Mensagem padrão de teste'
        }

    def test_create_client_successfully(self):
        client = Client.objects.create(**self.client_data)
        self.assertEqual(client.name, self.client_data['name'])
        self.assertEqual(client.email, self.client_data['email'])
        self.assertEqual(client.default_message, self.client_data['default_message'])
        self.assertTrue(client.active)
        self.assertFalse(client.have_plus)

    def test_duplicate_email_should_fail(self):
        Client.objects.create(**self.client_data)
        with self.assertRaises(IntegrityError):
            Client.objects.create(**self.client_data)

    def test_default_values_are_set(self):
        data = self.client_data.copy()
        data.pop('default_message')
        client = Client.objects.create(**data)
        self.assertTrue(client.active)
        self.assertFalse(client.have_plus)

    def test_missing_name_raises_error(self):
        data = self.client_data.copy()
        data.pop('name')
        client = Client(**data)
        with self.assertRaises(ValidationError):
            client.full_clean()

    def test_missing_email_raises_error(self):
        data = self.client_data.copy()
        data.pop('email')
        client = Client(**data)
        with self.assertRaises(ValidationError):
            client.full_clean()

    def test_invalid_email_format_raises_error(self):
        data = self.client_data.copy()
        data['email'] = 'email_invalido'
        client = Client(**data)
        with self.assertRaises(ValidationError):
            client.full_clean()  

    def test_update_client(self):
        client = Client.objects.create(**self.client_data)
        client.name = 'Joana da Silva'
        client.save()
        updated = Client.objects.get(pk=client.pk)
        self.assertEqual(updated.name, 'Joana da Silva')

class ClientAPITest(TestCase):

    def setUp(self):
        self.client_obj = Client.objects.create(
            name="Maria", email="maria@example.com", password="1234"
        )

        payload = {"user_id": self.client_obj.id}
        secret = settings.JWT_SECRET_KEY  
        self.token = jwt.encode(payload, secret, algorithm="HS256")

        self.client_api = APIClient()
        self.client_api.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_list_clients_via_api(self):
        response = self.client_api.get("/api/clients/")
        self.assertEqual(response.status_code, 200)

class ClientSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {
            "name": "Carlos",
            "email": "carlos@email.com",
            "password": "#senha123",
            "have_plus": True,
            "active": True,
            "default_message": "Mensagem padrão"
        }

    def test_create_client_with_hashed_password(self):
        serializer = ClientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        client = serializer.save()
        self.assertNotEqual(client.password, self.valid_data["password"])
        self.assertTrue(bcrypt.checkpw(self.valid_data["password"].encode(), client.password.encode()))

    def test_update_client_password_changes_hash(self):
        serializer = ClientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        client = serializer.save()

        original_hash = client.password
        update_data = {"password": "#novaSenha123"}
        serializer = ClientSerializer(client, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_client = serializer.save()

        self.assertNotEqual(updated_client.password, original_hash)
        self.assertTrue(bcrypt.checkpw("#novaSenha123".encode(), updated_client.password.encode()))

    def test_update_client_without_password_keeps_existing(self):
        serializer = ClientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        client = serializer.save()

        original_hash = client.password
        update_data = {"name": "Carlos Atualizado"}
        serializer = ClientSerializer(client, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_client = serializer.save()

        self.assertEqual(updated_client.password, original_hash)
        self.assertEqual(updated_client.name, "Carlos Atualizado")

class ClientViewSetTest(TestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_instance = Client.objects.create(
            name="Maria",
            email="maria@example.com",
            password="1234",
            have_plus=True,
            active=True,
            default_message="Ajuda!"
        )
        self.token = "Bearer mock-token"
        self.auth_header = {'HTTP_AUTHORIZATION': self.token}

    @patch('client.views.validate_token')
    def test_list_clients_authenticated(self, mock_validate_token):
        mock_validate_token.return_value = {"sub": self.client_instance.id}
        response = self.client_api.get("/api/clients/", **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    @patch('client.views.validate_token')
    def test_list_clients_unauthenticated(self, mock_validate_token):
        mock_validate_token.return_value = None
        response = self.client_api.get("/api/clients/", **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('client.views.validate_token')
    def test_put_update_client_authenticated(self, mock_validate_token):
        mock_validate_token.return_value = {"sub": self.client_instance.id}
        data = {
            "name": "Maria Atualizada",
            "email": self.client_instance.email,
            "password": "#novaSenha123",
            "have_plus": self.client_instance.have_plus,
            "active": self.client_instance.active,
            "default_message": "Mensagem atualizada"
        }
        response = self.client_api.put(f"/api/clients/{self.client_instance.id}/", data, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Maria Atualizada")

    @patch('client.views.validate_token')
    def test_put_update_client_unauthenticated(self, mock_validate_token):
        mock_validate_token.return_value = None
        response = self.client_api.patch(
            f"/api/clients/{self.client_instance.id}/", 
            {"name": "Novo Nome"}, 
            **self.auth_header
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    @patch('client.views.validate_token')
    def test_put_update_client_not_found(self, mock_validate_token):
        mock_validate_token.return_value = {"sub": 999}  # ID inexistente
        response = self.client_api.patch(
            f"/api/clients/{self.client_instance.id}/",
            {"name": "Nome"},
            **self.auth_header
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch('client.views.validate_token')
    def test_update_client_invalid_data(self, mock_validate_token):
        mock_validate_token.return_value = {"sub": self.client_instance.id}
        data = {
            "email": "",  
            "name": "Novo Nome"
        }
        response = self.client_api.put(
            f"/api/clients/{self.client_instance.id}/",
            data,
            **self.auth_header
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

class ClientModelMethodTest(TestCase):
    def setUp(self):
        self.client_instance = Client.objects.create(
            name="Ana Paula",
            email="ana@example.com",
            password="123456"
        )

    def test_str_method_returns_name(self):
        self.assertEqual(str(self.client_instance), "Ana Paula")

    def test_get_contact_emails_returns_only_valid_emails(self):
        Contact.objects.create(client=self.client_instance, name="Contato 1", email="valido@email.com")
        Contact.objects.create(client=self.client_instance, name="Contato 2", email="")
        Contact.objects.create(client=self.client_instance, name="Contato 3", email=None)

        emails = list(self.client_instance.get_contact_emails())
        self.assertEqual(emails, ["valido@email.com"])