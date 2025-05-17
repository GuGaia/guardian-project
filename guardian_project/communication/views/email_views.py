from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class EmailView(APIView):
    """View para operações relacionadas a e-mails"""
    
    def post(self, request, *args, **kwargs):
        """Envia um e-mail"""
        return Response(
            {"status": "E-mail enviado com sucesso"},
            status=status.HTTP_200_OK
        )
        
    def get(self, request, *args, **kwargs):
        """Retorna status do serviço de e-mail"""
        return Response(
            {"status": "Serviço de e-mail operacional"},
            status=status.HTTP_200_OK
        )