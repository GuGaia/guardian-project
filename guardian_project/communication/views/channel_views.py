from rest_framework import viewsets, status
from ..models import CommunicationChannel
from ..serializers import CommunicationChannelSerializer
from common.auth import validate_token
from ..permissions import IsAdminUserOnly


class CommunicationViewSet(viewsets.ModelViewSet):
    """Viewset padrão para o CRUD de CommunicationChannel"""
    queryset = CommunicationChannel.objects.all()
    serializer_class = CommunicationChannelSerializer
    permission_classes = [IsAdminUserOnly]

    def initial(self, request, *args, **kwargs):
        # Validação de token antes de qualquer ação
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        self.user_data = validate_token(token)

        if not self.user_data:
            self.permission_denied(
                request, message='Unauthorized', code=status.HTTP_401_UNAUTHORIZED
            )

        super().initial(request, *args, **kwargs)