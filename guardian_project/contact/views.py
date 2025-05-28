from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.response import Response
from rest_framework import status
from common.auth import validate_token

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def authenticate_request(self, request):
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_data = validate_token(token)
        if not user_data:
            return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        return None  # Authentication successful

    def list(self, request, *args, **kwargs):
        unauthorized_response = self.authenticate_request(request)
        if unauthorized_response:
            return unauthorized_response
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        unauthorized_response = self.authenticate_request(request)
        if unauthorized_response:
            return unauthorized_response
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        unauthorized_response = self.authenticate_request(request)
        if unauthorized_response:
            return unauthorized_response
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        unauthorized_response = self.authenticate_request(request)
        if unauthorized_response:
            return unauthorized_response
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        unauthorized_response = self.authenticate_request(request)
        if unauthorized_response:
            return unauthorized_response
        return super().destroy(request, *args, **kwargs)

    def get_queryset(self):
        client_pk = self.kwargs.get('client_pk')
        if client_pk:
            return Contact.objects.filter(client_id=client_pk)
        return Contact.objects.all()

    def perform_create(self, serializer):
        # Authentication is handled in the 'create' method
        client_pk = self.kwargs.get('client_pk')
        serializer.save(client_id=client_pk)