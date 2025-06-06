from django.test import TestCase
from communication.models import CommunicationChannel
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from communication.services.alert_service import send_alert_for_client
from communication.services.geocode_service import reverse_geocode
from communication.services.email_service import service_send_mail
from communication.services.sms_service import service_send_sms
from decouple import config
from client.models import Client
from twilio.base.exceptions import TwilioRestException


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

    def test_str_returns_name(self):
        channel = CommunicationChannel.objects.create(name="SMS")
        self.assertEqual(str(channel), "SMS")

class CommunicationAPITest(TestCase):
    def setUp(self):
        self.client_instance = Client.objects.create(
            name="Usuário Teste", email="teste@example.com", password="123"
        )
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.client_instance)

    @patch('communication.views.channel_views.validate_token')
    def test_create_channel_via_api(self, mock_validate_token):
        mock_validate_token.return_value = {'sub': self.client_instance.id}
        response = self.client_api.post('/api/communications/', {"name": "SMS"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch('communication.views.channel_views.validate_token')
    def test_list_channels_via_api(self, mock_validate_token):
        mock_validate_token.return_value = {'sub': self.client_instance.id}
        response = self.client_api.get('/api/communications/')
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
        
class EmailServiceTest(TestCase):
    @patch('communication.services.email_service.EmailMultiAlternatives')
    @patch('communication.services.email_service.render_to_string')
    def test_service_send_mail(self, mock_render_to_string, mock_email_class):
        mock_render_to_string.return_value = "<p>HTML content</p>"

        # Instancia falsa do e-mail
        mock_email_instance = MagicMock()
        mock_email_class.return_value = mock_email_instance

        subject = "Alerta"
        message = "Você está em perigo"
        recipient = "destinatario@email.com"
        service_send_mail(subject, message, recipient)

        # Verifica se o template foi renderizado com os argumentos corretos
        mock_render_to_string.assert_called_once_with('template_msg.html', {'message': subject, 'full_msg': message})

        mock_email_class.assert_called_once()
        mock_email_instance.attach_alternative.assert_called_once_with("<p>HTML content</p>", "text/html")
        mock_email_instance.send.assert_called_once()
    
    @patch("communication.services.email_service.EmailMultiAlternatives", side_effect=Exception("Simulated failure"))
    @patch("communication.services.email_service.render_to_string")
    @patch("communication.services.email_service.config")
    def test_service_send_mail_failure(self, mock_config, mock_render_to_string, mock_email):
        mock_config.return_value = "sender@example.com"
        mock_render_to_string.return_value = "<p>HTML Content</p>"

        result = service_send_mail("Subject", "Body", "recipient@example.com")

        self.assertFalse(result)

class AlertServiceTest(TestCase):
    @patch('communication.services.alert_service.service_send_mail')
    @patch('communication.services.alert_service.service_send_sms')
    @patch('communication.services.alert_service.reverse_geocode')
    @patch('communication.services.alert_service.Contact')
    def test_send_alert_for_client_with_coords(self, mock_contact_model, mock_reverse_geocode, mock_send_sms, mock_send_mail):
       
        mock_client = MagicMock()
        mock_client.default_message = "Socorro, preciso de ajuda"

        mock_reverse_geocode.return_value = "Rua Exemplo, 123"

        mock_contact = MagicMock()
        mock_contact.name = "Contato1"
        mock_contact.phone_number = "+551199999999"
        mock_contact.email = "contato@email.com"

        mock_channel_sms = MagicMock()
        mock_channel_sms.name = "sms"

        mock_channel_email = MagicMock()
        mock_channel_email.name = "email"

        mock_contact.channels.all.return_value = [mock_channel_sms, mock_channel_email]
        mock_contact_model.objects.filter.return_value = [mock_contact]

        result = send_alert_for_client(mock_client, lat=-23.5, lon=-46.6)

        mock_reverse_geocode.assert_called_once_with(-23.5, -46.6)
        mock_send_sms.assert_called_once()
        mock_send_mail.assert_called_once()
        self.assertTrue(result)

class SmsServiceTest(TestCase):
    @patch('communication.services.sms_service.sms_client')
    def test_service_send_sms_calls_twilio_client(self, mock_sms_client):
        mock_message = MagicMock()
        mock_message.body = "Mensagem enviada"
        mock_sms_client.messages.create.return_value = mock_message

        # Chamada
        result = service_send_sms("+551199999999", "Alerta de emergência!")
        self.assertTrue(result)

        # Verifica se foi chamado com os argumentos corretos
        mock_sms_client.messages.create.assert_called_once_with(
            from_=config('TWILIO_NUMBER'),
            to="+551199999999",
            body="Alerta de emergência!"
        )
    @patch('communication.services.sms_service.sms_client')
    def test_send_sms_twilio_exception(self, mock_sms_client):
        mock_sms_client.messages.create.side_effect = TwilioRestException(400, "https://api.twilio.com", "Erro simulado do Twilio")

        result = service_send_sms("+5511999999999", "Teste")
        self.assertFalse(result)

    @patch('communication.services.sms_service.sms_client')
    def test_send_sms_generic_exception(self, mock_sms_client):
        mock_sms_client.messages.create.side_effect = Exception("Erro genérico")

        result = service_send_sms("+5511999999999", "Teste")
        self.assertFalse(result)

class ChannelSendViewTest(TestCase):
    def setUp(self):
        self.client_instance = Client.objects.create(
            name="Usuário Teste", email="teste@example.com", password="123"
        )
        self.client_api = APIClient()
        self.client_api.force_authenticate(user=self.client_instance)
        self.url = '/api/communications/alert/send/'

    @patch('communication.views.channel_send_views.validate_token')
    @patch('communication.views.channel_send_views.Client')
    @patch('communication.views.channel_send_views.send_alert_for_client')
    def test_send_alert_with_coordinates_success(self, mock_send_alert, mock_client_model, mock_validate_token):
        mock_validate_token.return_value = {'sub': self.client_instance.id}
        mock_client_model.objects.get.return_value = MagicMock()
        mock_send_alert.return_value = True

        payload = {"lat": -23.5, "lon": -46.6}
        response = self.client_api.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("success", response.data['status'])

    @patch('communication.views.channel_send_views.validate_token')
    @patch('communication.views.channel_send_views.Client')
    @patch('communication.views.channel_send_views.send_alert_for_client')
    def test_send_alert_without_coordinates_success(self, mock_send_alert, mock_client_model, mock_validate_token):
        mock_validate_token.return_value = {'sub': self.client_instance.id}
        mock_client_model.objects.get.return_value = MagicMock()
        mock_send_alert.return_value = True

        response = self.client_api.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("success", response.data['status'])

    @patch('client.models.Client.objects.get')
    @patch('communication.views.channel_send_views.validate_token')
    def test_send_alert_client_not_found(self, mock_validate_token, mock_get):
        mock_validate_token.return_value = {'sub': self.client_instance.id}
        mock_get.side_effect = Client.DoesNotExist

        response = self.client_api.post(self.url, {}, format='json')

        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.data)

    @patch('communication.views.channel_send_views.validate_token')
    def test_send_alert_unauthenticated(self, mock_validate_token):
        self.client_api.logout()
        mock_validate_token.return_value = None
        response = self.client_api.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, 401)

    @patch('communication.views.channel_send_views.validate_token')
    @patch('communication.views.channel_send_views.Client')
    @patch('communication.views.channel_send_views.send_alert_for_client')
    def test_send_alert_failure(self, mock_send_alert, mock_client_model, mock_validate_token):
        mock_validate_token.return_value = {'sub': self.client_instance.id}
        mock_client_model.objects.get.return_value = MagicMock()
        mock_send_alert.return_value = False

        response = self.client_api.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, 500)

class TestSendAlertForClientEdgeCases(TestCase):

    @patch('communication.services.alert_service.Contact')
    @patch('communication.services.alert_service.reverse_geocode')
    def test_send_alert_without_address(self, mock_reverse_geocode, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = "Mensagem sem endereço"
        mock_reverse_geocode.return_value = None

        mock_channel = MagicMock(name='sms')
        mock_channel.name = "sms"
        mock_contact = MagicMock()
        mock_contact.name = "Contato sem endereço"
        mock_contact.channels.all.return_value = [mock_channel]
        mock_contact.phone_number = "+5500000000000"
        mock_contact_model.objects.filter.return_value = [mock_contact]

        with patch('communication.services.alert_service.service_send_sms', return_value=True):
            result = send_alert_for_client(mock_client, lat=-23.5, lon=-46.6)
            self.assertTrue(result)

    @patch('communication.services.alert_service.Contact')
    def test_send_alert_with_invalid_channel(self, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = "Mensagem canal inválido"

        mock_channel = MagicMock()
        mock_channel.name = "desconhecido"
        mock_contact = MagicMock()
        mock_contact.name = "Contato com canal desconhecido"
        mock_contact.channels.all.return_value = [mock_channel]
        mock_contact_model.objects.filter.return_value = [mock_contact]

        result = send_alert_for_client(mock_client)
        self.assertFalse(result)

    @patch('communication.services.alert_service.Contact')
    def test_send_alert_sms_failure(self, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = "Falha no SMS"

        mock_channel = MagicMock()
        mock_channel.name = "sms"
        mock_contact = MagicMock()
        mock_contact.name = "Contato falha SMS"
        mock_contact.phone_number = "+55123456789"
        mock_contact.channels.all.return_value = [mock_channel]
        mock_contact_model.objects.filter.return_value = [mock_contact]

        with patch('communication.services.alert_service.service_send_sms', return_value=False):
            result = send_alert_for_client(mock_client)
            self.assertFalse(result)

    @patch('communication.services.alert_service.Contact')
    def test_send_alert_email_failure(self, mock_contact_model):
        mock_client = MagicMock()
        mock_client.default_message = "Falha no e-mail"

        mock_channel = MagicMock()
        mock_channel.name = "email"
        mock_contact = MagicMock()
        mock_contact.name = "Contato falha e-mail"
        mock_contact.email = "falha@email.com"
        mock_contact.channels.all.return_value = [mock_channel]
        mock_contact_model.objects.filter.return_value = [mock_contact]

        with patch('communication.services.alert_service.service_send_mail', return_value=False):
            result = send_alert_for_client(mock_client)
            self.assertFalse(result)

class CommunicationViewSetAuthTest(TestCase):
    def setUp(self):
        self.client_api = APIClient()
        self.url = "/api/communications/"

    @patch("communication.views.channel_views.validate_token")
    def test_dispatch_returns_401_when_token_invalid(self, mock_validate_token):
        mock_validate_token.return_value = None

        response = self.client_api.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json(), {'detail': 'Unauthorized'})        

class TestReverseGeocodeExtra(TestCase):

    @patch("communication.services.geocode_service.requests.get")
    def test_reverse_geocode_non_200_status(self, mock_get):
        mock_get.return_value = MagicMock(status_code=404)
        self.assertIsNone(reverse_geocode(-23.5, -46.6))

    @patch("communication.services.geocode_service.requests.get")
    def test_reverse_geocode_exception(self, mock_get):
        mock_get.side_effect = Exception("timeout")
        self.assertIsNone(reverse_geocode(-23.5, -46.6))