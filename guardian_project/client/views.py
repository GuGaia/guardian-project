from rest_framework import viewsets
from rest_framework.response import Response
from .models import Client
from .serializers import ClientSerializer
from common.auth import validate_token
from rest_framework.decorators import action

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def list(self, request):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_data = validate_token(token)

        if not user_data:
            return Response({'detail': 'Unauthorized'}, status=401)


        clients = self.get_queryset()
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)
