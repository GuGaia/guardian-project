from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        client_pk = self.kwargs.get('client_pk')
        return Contact.objects.filter(client_id=client_pk)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(
                {"success": True, "message": "Contato excluído com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {"success": False, "message": "Erro ao excluir o contato.", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
