from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Contact
from .serializers import ContactSerializer
from common.auth import validate_token
from django.http import JsonResponse

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def dispatch(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_data = validate_token(token)
        if not user_data:
            return JsonResponse({'detail': 'Unauthorized'}, status=401)
        request.user_data = user_data
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        client_pk = self.kwargs.get('client_pk')
        if client_pk:
            return Contact.objects.filter(client_id=client_pk)
        return Contact.objects.all()

    def perform_create(self, serializer):
        client_pk = self.kwargs.get('client_pk')
        serializer.save(client_id=client_pk)

    def destroy(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_data = validate_token(token)
        if not user_data:
            return JsonResponse({'detail': 'Unauthorized'}, status=401)
        
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(
                {"success": True, "message": "Contato excluído com sucesso."},
                status=status.HTTP_200_OK  # Changed status code to 200 OK
            )
        except Exception as e:
            return Response(
                {"success": False, "message": "Erro ao excluir o contato.", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )