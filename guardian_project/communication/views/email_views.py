from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from communication.services.email_service import send_mail

class EmailView(APIView):
    """View para operações relacionadas a e-mails"""
    
    def post(self, request, *args, **kwargs):
        """Envia um e-mail"""
        # user = request.user

        # send_mail(
        #     subject='Nova mensagem de {}'.format(user.get_full_name()),
        #     message='Oi, você recebeu uma nova mensagem de {}.'.format(user.email),
        #     from_email='',  # ou noreply@seusite.com
        #     recipient_list=[user.contacts.email],
        # )

        # client = Client.objects.get(user=request.user)
        # contact_emails = client.get_contact_emails()
        contact_emails = 'fekoso8574@bamsrad.com'

        send_mail(
            subject="Esse é o email que estou enviando",
            message="Conteúdo do e-mail kkkkkk",
            recipient_list=[contact_emails]
        )

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