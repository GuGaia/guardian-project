from django.test import TestCase
from client.models import Client
from communication.models import CommunicationChannel
from contact.models import Contact
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock


class ContactModelTest(TestCase):

    def setUp(self):
        self.client_obj = Client.objects.create(
            name="Maria", email="maria@example.com", password="1234"
        )
        self.channel = CommunicationChannel.objects.create(name="WhatsApp")

    def test_create_contact_successfully(self):
        contact = Contact.objects.create(
            client=self.client_obj,
            name="João Contato",
            phone_number="+5511999999999",
            relationship="Amigo",
            email="joao@example.com"
        )
        contact.channels.set([self.channel])
        self.assertEqual(contact.client, self.client_obj)
        self.assertEqual(contact.name, "João Contato")

    def test_missing_name_should_fail(self):
        contact = Contact(
            client=self.client_obj,
            name="",
            phone_number="123",
            relationship="Amigo"
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_missing_relationship_should_fail(self):
        contact = Contact(
            client=self.client_obj,
            name="Contato",
            phone_number="123",
            relationship=""
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_phone_number_max_length(self):
        contact = Contact(
            client=self.client_obj,
            name="Teste",
            phone_number="9" * 21,  # 21 caracteres, acima do permitido
            relationship="Colega"
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_update_contact_name(self):
        contact = Contact.objects.create(
            client=self.client_obj,
            name="Antigo Nome",
            phone_number="123",
            relationship="Amigo",
            email="email@teste.com"
        )
        contact.name = "Novo Nome"
        contact.save()
        updated = Contact.objects.get(pk=contact.pk)
        self.assertEqual(updated.name, "Novo Nome")

    def test_delete_client_cascades_to_contact(self):
        contact = Contact.objects.create(
            client=self.client_obj,
            name="Contato",
            phone_number="123",
            relationship="Família"
        )
        contact.channels.set([self.channel])
        self.client_obj.delete()
        self.assertEqual(Contact.objects.count(), 0)

    def test_delete_channel_cascades_to_contact(self):
        contact = Contact.objects.create(
            client=self.client_obj,
            name="Contato",
            phone_number="123",
            relationship="Família"
        )
        contact.channels.set([self.channel])
        self.channel.delete()
        self.assertEqual(contact.channels.count(), 0)

    def test_str_representation_returns_correct_format(self):

        client = Client.objects.create(
            name="Carlos", email="carlos@email.com", password="1234"
        )
        channel_sms = CommunicationChannel.objects.create(name="sms")
        channel_email = CommunicationChannel.objects.create(name="email")

        contact = Contact.objects.create(
            client=client,
            name="Mãe",
            phone_number="11999999999",
            relationship="mãe",
            email="mae@email.com"
        )
        contact.channels.set([channel_sms, channel_email])

        expected_str = "Mãe (Carlos)  sms, email"
        self.assertEqual(str(contact), expected_str)

from rest_framework.test import APIClient
from rest_framework import status

class ContactAPITest(TestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_obj = Client.objects.create(name="Maria", email="maria@example.com", password="1234")
        self.channel = CommunicationChannel.objects.create(name="email")
        self.auth_header = {'HTTP_AUTHORIZATION': 'Bearer mock-token'}

    @patch("contact.views.validate_token")
    def test_create_contact_via_api(self,  mock_validate_token):
        mock_validate_token.return_value = {"sub": self.client_obj.id}
        data = {
            "name": "João Contato",
            "phone_number": "+5511999999999",
            "relationship": "Amigo",
            "email": "joao@example.com",
            "channel_ids": [self.channel.id]
        }
        response = self.client_api.post(
            f"/api/clients/{self.client_obj.id}/contacts/",
            data,
            format="json",
            **self.auth_header
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch("contact.views.validate_token")
    def test_delete_contact_returns_custom_response(self, mock_validate_token):
        mock_validate_token.return_value = {"sub": self.client_obj.id}
        contact = Contact.objects.create(
            client=self.client_obj,
            name="Contato",
            phone_number="123456789",
            relationship="Família",
            email="teste@teste.com"
        )
        contact.channels.set([self.channel])

        response = self.client_api.delete(
            f"/api/clients/{self.client_obj.id}/contacts/{contact.id}/",
            **self.auth_header
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class ContactSerializerTest(TestCase):
    def test_update_contact_channels(self):
        from communication.models import CommunicationChannel
        from client.models import Client
        from contact.models import Contact
        from contact.serializers import ContactSerializer

        client = Client.objects.create(name="Carlos", email="carlos@email.com", password="1234")
        channel1 = CommunicationChannel.objects.create(name="sms")
        channel2 = CommunicationChannel.objects.create(name="email")
        channel3 = CommunicationChannel.objects.create(name="whatsapp")

        contact = Contact.objects.create(
            client=client,
            name="Contato Antigo",
            phone_number="11999999999",
            relationship="amigo",
            email="contato@email.com"
        )
        contact.channels.set([channel1, channel2])

        update_data = {
            "name": "Contato Atualizado",
            "phone_number": "11888888888",
            "relationship": "irmão",
            "email": "novo@email.com",
            "channel_ids": [channel3.id]  
        }

        serializer = ContactSerializer(contact, data=update_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        updated_contact = serializer.save()

        self.assertEqual(updated_contact.name, "Contato Atualizado")
        self.assertEqual(updated_contact.phone_number, "11888888888")
        self.assertEqual(updated_contact.email, "novo@email.com")
        self.assertEqual(list(updated_contact.channels.all()), [channel3])

class ContactViewSetTest(TestCase):
    def setUp(self):
        self.api_client = APIClient()
        self.client_db = Client.objects.create(name="Teste", email="teste@email.com", password="1234")
        self.other_client = Client.objects.create(name="Outro", email="outro@email.com", password="1234")
        self.auth_header = {'HTTP_AUTHORIZATION': 'Bearer mock-token'}

    @patch('contact.views.validate_token')
    def test_forbidden_if_client_pk_different_from_token(self, mock_validate_token):
        mock_validate_token.return_value = {'sub': self.client_db.id}
        # client_pk no path diferente do token
        response = self.api_client.get(
            f'/api/clients/{self.other_client.id}/contacts/',
            **self.auth_header
        )
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {'detail': 'Forbidden'})        
        
    @patch('contact.views.validate_token')
    def test_unauthorized_if_token_invalid(self, mock_validate_token):
        mock_validate_token.return_value = None
        response = self.api_client.get(
            f'/api/clients/{self.client_db.id}/contacts/',
            **self.auth_header
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'detail': 'Uyynauthorized'})    