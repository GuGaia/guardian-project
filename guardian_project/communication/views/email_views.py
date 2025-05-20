from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from client.models import Client
from communication.services.alert_service import send_alert_for_client

class EmailView(APIView):
    def post(self, request, *args, **kwargs):
        client_id = request.data.get("client_id")
        if not client_id:
            return Response(
                {"error": "client_id é obrigatório"},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            client = Client.objects.get(id=client_id)
        except Client.DoesNotExist:
            return Response(
                {"error": "Cliente não encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        # coordenadas de exemplo p teste
        lat = request.data.get("latitude", -23.55052)
        lon = request.data.get("longitude", -46.633308)

        send_alert_for_client(client, lat, lon)
        return Response(
            {"status": "sucess"},
            status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        return Response(
            {"status": "Serviço de e-mail"},
            status=status.HTTP_200_OK
        )
