from rest_framework import viewsets
from rest_framework.response import Response
from .models import Client
from .serializers import ClientSerializer
from common.auth import validate_token
from rest_framework.decorators import action

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def get_client_from_token(self, request):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_data = validate_token(token)
        if not user_data:
            return None
        try:
            return Client.objects.get(id=user_data['sub'])
        except Client.DoesNotExist:
            return None

    def list(self, request):
        client = self.get_client_from_token(request)
        if not client:
            return Response({'detail': 'Unauthorized'}, status=401)
        
        serializer = ClientSerializer(client)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        client = self.get_client_from_token(request)
        if not client:
            return Response({'detail': 'Unauthorized'}, status=401)

        if str(client.id) != str(pk):
            return Response({'detail': 'Forbidden'}, status=403)

        serializer = ClientSerializer(client)
        return Response(serializer.data)


    def update(self, request, *args, **kwargs):
        client = self.get_client_from_token(request)
        if not client:
            return Response({'detail': 'Unauthorized'}, status=401)

        try:
            client = Client.objects.get(id=client.id)
        except Client.DoesNotExist:
            return Response({'detail': 'Not Found'}, status=404)

        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            updated_client = serializer.save()
            return Response(ClientSerializer(updated_client).data, status=200)
        return Response(serializer.errors, status=400)
