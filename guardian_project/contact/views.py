from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        client_pk = self.kwargs.get('client_pk')
        return Contact.objects.filter(client_id=client_pk)
