from rest_framework import viewsets, status
from rest_framework.response import Response
from ..models import CommunicationChannel
from ..serializers import CommunicationChannelSerializer
from common.auth import validate_token
from django.http import JsonResponse

class CommunicationViewSet(viewsets.ModelViewSet):
    """Viewset padrão para o CRUD de CommunicationChannel"""
    queryset = CommunicationChannel.objects.all()
    serializer_class = CommunicationChannelSerializer

    def dispatch(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_data = validate_token(token)
        if not user_data:
            return JsonResponse({'detail': 'Uyynauthorized'}, status=401)
        request.user_data = user_data
        return super().dispatch(request, *args, **kwargs)
