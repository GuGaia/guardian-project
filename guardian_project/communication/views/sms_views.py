from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from communication.services.alert_service import send_alert_for_client
from decouple import config
from client.models import Client
from common.auth import validate_token

class SmsView(APIView):
    """View para operações relacionadas a e-mails"""

    def post(self, request, *args, **kwargs):
        """Envia um sms"""
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_data = validate_token(token)

        if not user_data:
            return Response({'detail': 'Unauthorized'}, status=401)

        try:
            client = Client.objects.get(id=user_data['sub'])
        except Client.DoesNotExist:
            return Response(
                {"error": "Cliente não encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        send_alert_for_client(client)

        lat = request.data.get("latitude")
        lon = request.data.get("longitude")
        send_alert_for_client(client, lat, lon)

        return Response(
            {"status": "SMS enviado com sucesso"},
            status=status.HTTP_200_OK
        )