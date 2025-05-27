# client/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet
from contact.views import ContactViewSet

router = DefaultRouter()
router.register(r'', ClientViewSet, basename='client')

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
    path('', include(router.urls)),
    path('<int:client_pk>/contacts/',       contact_list,   name='client-contact-list'),
    path('<int:client_pk>/contacts/<int:pk>/', contact_detail, name='client-contact-detail'),
]
