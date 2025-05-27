from django.test import TestCase
from communication.models import CommunicationChannel
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from communication.services.alert_service import send_alert_for_client

class CommunicationChannelModelTest(TestCase):

    def test_create_channel_successfully(self):
        channel = CommunicationChannel.objects.create(name='WhatsApp')
        self.assertEqual(channel.name, 'WhatsApp')

    def test_create_multiple_channels(self):
        CommunicationChannel.objects.create(name='WhatsApp')
        CommunicationChannel.objects.create(name='Email')
        CommunicationChannel.objects.create(name='Telegram')
        self.assertEqual(CommunicationChannel.objects.count(), 3)

    def test_channel_without_name_should_fail(self):
        channel = CommunicationChannel(name='')
        with self.assertRaises(ValidationError):
            channel.full_clean()

    def test_channel_name_max_length(self):
        long_name = 'X' * 51  # acima do max_length=50
        channel = CommunicationChannel(name=long_name)
        with self.assertRaises(ValidationError):
            channel.full_clean()

    def test_update_channel_name(self):
        channel = CommunicationChannel.objects.create(name='Radio')
        channel.name = 'Radio FM'
        channel.save()
        updated = CommunicationChannel.objects.get(pk=channel.pk)
        self.assertEqual(updated.name, 'Radio FM')

class CommunicationAPITest(TestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.channel_data = {"name": "Telegram"}

    def test_create_channel_via_api(self):
        response = self.client_api.post("/api/communications/", self.channel_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], self.channel_data["name"])

    def test_list_channels_via_api(self):
        CommunicationChannel.objects.create(name="SMS")
        response = self.client_api.get("/api/communications/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

class SendAlertForClientTest(TestCase):

    @patch('communication.services.alert_service.Contact')
    @patch('communication.services.alert_service.reverse_geocode')
    def test_send_alert_with_coordinates(self, mock_reverse_geocode, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = 'Mensagem de alerta'
        mock_reverse_geocode.return_value = 'Endereço Simulado'

        mock_contact_model.objects.filter.return_value = ['Contato1', 'Contato2']

        result = send_alert_for_client(mock_client, lat=-23.5, lon=-46.6)

        mock_reverse_geocode.assert_called_once_with(-23.5, -46.6)
        mock_contact_model.objects.filter.assert_called_once_with(client=mock_client)
        self.assertTrue(result)

    @patch('communication.services.alert_service.Contact')
    def test_send_alert_without_coordinates(self, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = 'Mensagem padrão'

        mock_contact_model.objects.filter.return_value = []

        result = send_alert_for_client(mock_client)

        mock_contact_model.objects.filter.assert_called_once_with(client=mock_client)
        self.assertTrue(result)
