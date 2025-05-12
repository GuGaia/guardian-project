from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ContactViewSet

contact_list = ContactViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
contact_detail = ContactViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

urlpatterns = [
    path('', contact_list, name='contact-list'),
    path('<int:pk>/', contact_detail, name='contact-detail'),
]
