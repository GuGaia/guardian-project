from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from client.models import Client
from communication.services.alert_service import send_alert_for_client
from common.auth import validate_token
from communication.services.geocode_service import get_current_location

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
        lat = request.data.get("latitude", None)
        lon = request.data.get("longitude", None)

        print(f"{lat} {lon} >>>>>>>>")
        if lat is None or lon is None:
            get_location = get_current_location()
            if get_location:
                lat = get_location['latitude']
                lon = get_location['longitude']
                print(f"{lat} {lon} ///////////")

        print(f"{lat} {lon} <<<<<<<<<<<")
        if lat is None or lon is None:
            return Response(
                {"error": "Coordenadas ausentes e localização automática falhou"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            lat = float(lat)
            lon = float(lon)
        except (ValueError, TypeError):
            return Response(
                {"error": "Latitude e longitude inválidas"},
                status=status.HTTP_400_BAD_REQUEST
            )

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
