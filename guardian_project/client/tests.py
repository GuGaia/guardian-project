from django.test import TestCase
from client.models import Client  # ajuste conforme necessário
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status
import jwt
from django.conf import settings


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