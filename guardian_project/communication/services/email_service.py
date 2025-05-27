import requests
from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail as django_send_mail
from decouple import config

def service_send_mail(subject, message, recipient_list):
    django_send_mail(
        subject=subject,
        message=message,
        from_email=config('EMAIL_HOST_USER'),
        recipient_list=[recipient_list]
    )