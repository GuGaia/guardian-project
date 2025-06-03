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
        print("VALOR DO AUTH_HEADER:", auth_header)
        token = auth_header.replace('Bearer ', '')
        print("VALOR DO TOKEN:", token)
        user_data = validate_token(token)
        print("VALOR DO USER_DATA:", user_data)
        if not user_data:
            return Response({'detail': 'Uyynauthorized'}, status=401)


        clients = self.get_queryset()
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_data = validate_token(token)

        if not user_data:
            return Response({'detail': 'Uyynauthorized'}, status=401)

        return super().retrieve(request, *args, **kwargs)


    def update(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_data = validate_token(token)
        print("VALOR DO USER_DATA:", user_data)

        if not user_data:
            return Response({'detail': 'Uyynauthorized'}, status=401)

        try:
            client = Client.objects.get(id=user_data['sub'])
        except Client.DoesNotExist:
            return Response({'detail': 'Not Found'}, status=404)

        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            updated_client = serializer.save()
            return Response(ClientSerializer(updated_client).data, status=200)
        return Response(serializer.errors, status=400)
