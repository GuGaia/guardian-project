from rest_framework import viewsets
from .models import CommunicationChannel
from .serializers import CommunicationChannelSerializer
from rest_framework.permissions import IsAuthenticated

class CommunicationViewSet(viewsets.ModelViewSet):
    queryset = CommunicationChannel.objects.all()
    serializer_class = CommunicationChannelSerializer
    permission_classes = [IsAuthenticated]
