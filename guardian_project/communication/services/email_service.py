from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail as django_send_mail

def send_mail(subject, message, recipient_list):
    django_send_mail(
        subject,
        message,
        recipient_list,
    )
