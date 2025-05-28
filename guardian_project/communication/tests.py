from django.test import TestCase
from communication.models import CommunicationChannel
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from communication.services.alert_service import send_alert_for_client
from communication.services.geocode_service import reverse_geocode

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
        self.auth_header = {'HTTP_AUTHORIZATION': 'Bearer mock-token'}

    @patch('communication.views.channel_views.validate_token')
    def test_create_channel_via_api(self, mock_validate_token):
        mock_validate_token.return_value = {'sub': 1}
        response = self.client_api.post('/api/communications/', {"name": "SMS"}, format='json', **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch('communication.views.channel_views.validate_token')
    def test_list_channels_via_api(self, mock_validate_token):
        mock_validate_token.return_value = {'sub': 1}
        response = self.client_api.get('/api/communications/', **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class SendAlertForClientTest(TestCase):

    @patch('communication.services.alert_service.Contact')
    @patch('communication.services.alert_service.reverse_geocode')
    def test_send_alert_with_coordinates(self, mock_reverse_geocode, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = 'Mensagem de alerta'
        mock_reverse_geocode.return_value = 'Endereço Simulado'

        mock_contact_model.objects.filter.return_value = [MagicMock(name="Contato1"), MagicMock(name="Contato2")]

        result = send_alert_for_client(mock_client, lat=-23.5, lon=-46.6)

        mock_reverse_geocode.assert_called_once_with(-23.5, -46.6)
        mock_contact_model.objects.filter.assert_called_once_with(client=mock_client)
        self.assertTrue(result)

    @patch('communication.services.alert_service.Contact')
    def test_send_alert_without_coordinates(self, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = 'Mensagem padrão'

        mock_contact = MagicMock()
        mock_contact.name = "Contato1"
        mock_contact_model.objects.filter.return_value = [mock_contact]


        result = send_alert_for_client(mock_client)

        mock_contact_model.objects.filter.assert_called_once_with(client=mock_client)
        self.assertTrue(result)

class ReverseGeocodeTest(TestCase):

    @patch('communication.services.geocode_service.requests.get')
    def test_reverse_geocode_success(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"display_name": "Rua Fictícia, São Paulo, Brasil"}
        mock_get.return_value = mock_response

        result = reverse_geocode(-23.5, -46.6)
        self.assertEqual(result, "Rua Fictícia, São Paulo, Brasil")

    @patch('communication.services.geocode_service.requests.get')
    def test_reverse_geocode_http_error(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_get.return_value = mock_response

        result = reverse_geocode(-23.5, -46.6)
        self.assertIsNone(result)

    @patch('communication.services.geocode_service.requests.get')
    def test_reverse_geocode_exception(self, mock_get):
        mock_get.side_effect = Exception("Erro na requisição")

        result = reverse_geocode(-23.5, -46.6)
        self.assertIsNone(result)
