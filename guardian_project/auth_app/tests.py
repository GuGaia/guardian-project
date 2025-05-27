from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
import bcrypt

class AuthAppLoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/login/' 
        self.valid_email = 'joao2_novo_email@email.com'
        self.valid_password = '#cliente123'
        self.hashed_password = bcrypt.hashpw(self.valid_password.encode('utf-8'), bcrypt.gensalt())

    @patch('auth_app.views.connection')
    @patch('auth_app.views.bcrypt.checkpw')
    def test_login_success(self, mock_checkpw, mock_connection):
        mock_cursor = MagicMock()
        mock_connection.cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = (
            1, 'Test User', self.valid_email, self.hashed_password, 'Mensagem', True, False
        )
        mock_checkpw.return_value = True

        response = self.client.post(self.url, {
            'email': self.valid_email,
            'password': self.valid_password
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['email'], self.valid_email)

    def test_login_missing_fields(self):
        response = self.client.post(self.url, {'email': self.valid_email})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('auth_app.views.connection')
    def test_login_user_not_found(self, mock_connection):
        mock_cursor = MagicMock()
        mock_connection.cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = None

        response = self.client.post(self.url, {
            'email': 'notfound@example.com',
            'password': 'somepassword'
        })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('auth_app.views.connection')
    @patch('auth_app.views.bcrypt.checkpw')
    def test_login_invalid_password(self, mock_checkpw, mock_connection):
        mock_cursor = MagicMock()
        mock_connection.cursor.return_value.__enter__.return_value = mock_cursor
        mock_cursor.fetchone.return_value = (
            1, 'Test User', self.valid_email, self.hashed_password, 'Mensagem', True, False
        )
        mock_checkpw.return_value = False

        response = self.client.post(self.url, {
            'email': self.valid_email,
            'password': 'wrongpassword'
        })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('auth_app.views.connection')
    def test_login_internal_error(self, mock_connection):
        mock_connection.cursor.side_effect = Exception('DB error')

        response = self.client.post(self.url, {
            'email': self.valid_email,
            'password': self.valid_password
        })

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
