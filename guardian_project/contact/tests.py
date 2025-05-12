from django.test import TestCase
from client.models import Client
from communication.models import CommunicationChannel
from contact.models import Contact
from django.core.exceptions import ValidationError

class ContactModelTest(TestCase):

    def setUp(self):
        self.client = Client.objects.create(
            name="Maria", email="maria@example.com", password="1234"
        )
        self.channel = CommunicationChannel.objects.create(name="WhatsApp")

    def test_create_contact_successfully(self):
        contact = Contact.objects.create(
            client=self.client,
            name="João Contato",
            phone_number="+5511999999999",
            plataform="Mobile",
            relationship="Amigo",
            channel=self.channel
        )
        self.assertEqual(contact.client, self.client)
        self.assertEqual(contact.channel, self.channel)
        self.assertEqual(contact.name, "João Contato")

    def test_missing_name_should_fail(self):
        contact = Contact(
            client=self.client,
            name="",
            phone_number="123",
            plataform="App",
            relationship="Amigo",
            channel=self.channel
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_missing_plataform_should_fail(self):
        contact = Contact(
            client=self.client,
            name="Contato",
            phone_number="123",
            plataform="",
            relationship="Amigo",
            channel=self.channel
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_missing_relationship_should_fail(self):
        contact = Contact(
            client=self.client,
            name="Contato",
            phone_number="123",
            plataform="App",
            relationship="",
            channel=self.channel
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_phone_number_max_length(self):
        contact = Contact(
            client=self.client,
            name="Teste",
            phone_number="9" * 21,  # 21 caracteres, acima do permitido
            plataform="App",
            relationship="Colega",
            channel=self.channel
        )
        with self.assertRaises(ValidationError):
            contact.full_clean()

    def test_update_contact_name(self):
        contact = Contact.objects.create(
            client=self.client,
            name="Antigo Nome",
            phone_number="123",
            plataform="App",
            relationship="Amigo",
            channel=self.channel
        )
        contact.name = "Novo Nome"
        contact.save()
        updated = Contact.objects.get(pk=contact.pk)
        self.assertEqual(updated.name, "Novo Nome")

    def test_delete_client_cascades_to_contact(self):
        contact = Contact.objects.create(
            client=self.client,
            name="Contato",
            phone_number="123",
            plataform="App",
            relationship="Família",
            channel=self.channel
        )
        self.client.delete()
        self.assertEqual(Contact.objects.count(), 0)

    def test_delete_channel_cascades_to_contact(self):
        contact = Contact.objects.create(
            client=self.client,
            name="Contato",
            phone_number="123",
            plataform="App",
            relationship="Família",
            channel=self.channel
        )
        self.channel.delete()
        self.assertEqual(Contact.objects.count(), 0)
