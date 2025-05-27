from rest_framework import viewsets
from ..models import CommunicationChannel
from ..serializers import CommunicationChannelSerializer

class CommunicationViewSet(viewsets.ModelViewSet):
    """Viewset padrão para o CRUD de CommunicationChannel"""
    queryset = CommunicationChannel.objects.all()
    serializer_class = CommunicationChannelSerializer