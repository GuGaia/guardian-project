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
from client.views import ClientViewSet

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

        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.client_obj)

    @patch.object(ClientViewSet, 'get_client_from_token')
    def test_list_clients_via_api(self, mock_validate_token):
        mock_validate_token.return_value = self.client_obj
        response = self.client_api.get("/api/clients/")
        self.assertEqual(response.status_code, 200)

class ClientSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {
            "name": "Carlos",
            "email": "carlos@email.com",
            "password": "#senha123",
            "number": "11999999999",
            "have_plus": True,
            "active": True,
            "default_message": "Mensagem padrão"
        }

    def test_create_client_with_hashed_password(self):
        serializer = ClientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        client = serializer.save()
        self.assertNotEqual(client.password, self.valid_data["password"])
        self.assertTrue(bcrypt.checkpw(self.valid_data["password"].encode(), client.password.encode()))

    def test_update_client_password_changes_hash(self):
        serializer = ClientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        client = serializer.save()

        original_hash = client.password
        update_data = {"password": "#novaSenha123"}
        serializer = ClientSerializer(client, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        updated_client = serializer.save()

        self.assertNotEqual(updated_client.password, original_hash)
        self.assertTrue(bcrypt.checkpw("#novaSenha123".encode(), updated_client.password.encode()))

    def test_update_client_without_password_keeps_existing(self):
        serializer = ClientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        client = serializer.save()

        original_hash = client.password
        update_data = {"name": "Carlos Atualizado"}
        serializer = ClientSerializer(client, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
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
            number="11999999999",
            have_plus=True,
            active=True,
            default_message="Ajuda!"
        )
        self.token = "Bearer mock-token"
        self.auth_header = {'HTTP_AUTHORIZATION': self.token}

        self.client_api.force_authenticate(user=self.client_instance)

    @patch.object(ClientViewSet, "get_client_from_token")
    def test_list_clients_authenticated(self, mock_get_client):
        mock_get_client.return_value = self.client_instance
        resp = self.client_api.get("/api/clients/")
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], self.client_instance.id)

    @patch.object(ClientViewSet, "get_client_from_token")
    def test_put_update_client_authenticated(self, mock_get_client):
        mock_get_client.return_value = self.client_instance
        data = {"name": "Maria Atualizada", "email": self.client_instance.email}
        resp = self.client_api.put(f"/api/clients/{self.client_instance.id}/", data)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    @patch.object(ClientViewSet, "get_client_from_token")
    def test_update_client_invalid_data(self, mock_get_client):
        mock_get_client.return_value = self.client_instance
        data = {"email": ""}                         # inválido → 400
        resp = self.client_api.put(f"/api/clients/{self.client_instance.id}/", data)
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", resp.data)

    # ---------- TESTES QUE ESPERAM 401 ----------
    @patch.object(ClientViewSet, "get_client_from_token")
    def test_list_clients_unauthenticated(self, mock_get_client):
        # 🔑 desloga para remover autenticação
        self.client_api.logout()
        mock_get_client.return_value = None          # sem client → 401
        resp = self.client_api.get("/api/clients/", **self.auth_header)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch.object(ClientViewSet, "get_client_from_token")
    def test_put_update_client_unauthenticated(self, mock_get_client):
        self.client_api.logout()
        mock_get_client.return_value = None
        resp = self.client_api.put(
            f"/api/clients/{self.client_instance.id}/",
            {"name": "Novo Nome"},
            **self.auth_header,
        )
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch.object(ClientViewSet, "get_client_from_token")
    def test_put_update_client_not_found(self, mock_get_client):
        self.client_api.logout()
        mock_get_client.return_value = None
        resp = self.client_api.put(
            f"/api/clients/{self.client_instance.id}/",
            {"name": "Nome"},
            **self.auth_header,
        )
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

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