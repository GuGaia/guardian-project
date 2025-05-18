from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from communication.services.sms_service import send_sms
from decouple import config

class SmsView(APIView):
    """View para operações relacionadas a e-mails"""

    def post(self, request, *args, **kwargs):
        """Envia um sms"""
        send_sms(
            message="Conteúdo do SMS kkkkkk", # current_user.default_message
            destiny_number=config('DESTINY_TEST')
        )

        return Response(
            {"status": "SMS enviado com sucesso"},
            status=status.HTTP_200_OK
        )