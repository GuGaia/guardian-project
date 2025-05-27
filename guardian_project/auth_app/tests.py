from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
import bcrypt
import jwt
from django.conf import settings

class AuthLoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/login/'
        self.password = 'mypassword'
        self.hashed = bcrypt.hashpw(self.password.encode(), bcrypt.gensalt())

        self.user_data = (
            1, "Maria", "maria@example.com", self.hashed,
            "Estou em perigo", True, False
        )

    @patch('auth_app.views.connection')
    def test_login_successful(self, mock_connection):
        cursor = MagicMock()
        cursor.fetchone.return_value = self.user_data
        mock_connection.cursor.return_value.__enter__.return_value = cursor

        response = self.client.post(self.url, {
            "email": "maria@example.com",
            "password": self.password
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["email"], "maria@example.com")

    @patch('auth_app.views.connection')
    def test_login_invalid_email(self, mock_connection):
        cursor = MagicMock()
        cursor.fetchone.return_value = None
        mock_connection.cursor.return_value.__enter__.return_value = cursor

        response = self.client.post(self.url, {
            "email": "wrong@example.com",
            "password": self.password
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('auth_app.views.connection')
    def test_login_wrong_password(self, mock_connection):
        wrong_hash = bcrypt.hashpw("otherpass".encode(), bcrypt.gensalt())
        user_data_wrong_pw = self.user_data[:3] + (wrong_hash,) + self.user_data[4:]
        cursor = MagicMock()
        cursor.fetchone.return_value = user_data_wrong_pw
        mock_connection.cursor.return_value.__enter__.return_value = cursor

        response = self.client.post(self.url, {
            "email": "maria@example.com",
            "password": "wrongpassword"
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_missing_fields(self):
        response = self.client.post(self.url, {
            "email": "maria@example.com"
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('auth_app.views.connection')
    def test_login_internal_error(self, mock_connection):
        mock_connection.cursor.side_effect = Exception("DB exploded")

        response = self.client.post(self.url, {
            "email": "maria@example.com",
            "password": self.password
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)