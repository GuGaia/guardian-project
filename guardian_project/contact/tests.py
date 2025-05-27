from django.test import TestCase
from client.models import Client
from communication.models import CommunicationChannel
from contact.models import Contact
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status


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

from rest_framework.test import APIClient
from rest_framework import status

class ContactAPITest(TestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.client_obj = Client.objects.create(
            name="Maria", email="maria@example.com", password="1234"
        )
        self.channel_obj = CommunicationChannel.objects.create(name="WhatsApp")

        self.contact_data = {
            "name": "João Contato",
            "phone_number": "+5511999999999",
            "relationship": "Amigo",
            "email": "joao@example.com",
            "channel_ids": [self.channel_obj.id]
        }

    def create_contact_instance(self):
        contact = Contact.objects.create(
            client=self.client_obj,
            name=self.contact_data["name"],
            phone_number=self.contact_data["phone_number"],
            relationship=self.contact_data["relationship"],
            email=self.contact_data["email"]
        )
        contact.channels.set([self.channel_obj])
        return contact

    def test_create_contact_via_api(self):
        url = f"/api/clients/{self.client_obj.id}/contacts/"
        response = self.client_api.post(url, self.contact_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], self.contact_data["name"])

    def test_delete_contact_returns_custom_response(self):
        contact = self.create_contact_instance()
        url = f"/api/clients/{self.client_obj.id}/contacts/{contact.id}/"
        response = self.client_api.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)