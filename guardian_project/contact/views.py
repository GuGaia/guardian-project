from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Contact
from .serializers import ContactSerializer
from common.auth import validate_token

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def dispatch(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_data = validate_token(token)
        if not user_data:
            return JsonResponse({'detail': 'Uyynauthorized'}, status=401)

        client_id = user_data.get('sub')
        param_client = kwargs.get('client_pk')
        if param_client is not None and int(param_client) != int(client_id):
            return JsonResponse({'detail': 'Forbidden'}, status=403)

        request.client_id = client_id
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return Contact.objects.filter(client_id=self.request.client_id)

    def perform_create(self, serializer):
        serializer.save(client_id=self.request.client_id)
