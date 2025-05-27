from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from client.models import Client
from communication.services.alert_service import send_alert_for_client
from common.auth import validate_token

class ChannelSendView(APIView):
    def post(self, request, *args, **kwargs):
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

        # coordenadas de exemplo p teste
        lat = request.data.get("latitude", -23.55052)
        lon = request.data.get("longitude", -46.633308)

        alert_sent = send_alert_for_client(client, lat, lon)
        if not alert_sent:
            return Response(
                {"error": "Falha ao enviar o alerta para o cliente."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {"status": "success"},
            status=status.HTTP_200_OK
        )
