import requests
from django.http import HttpResponse
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import render
from django.core.mail import send_mail as django_send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from decouple import config

def service_send_mail(subject, message, recipient_list):
    try:
        html_content = render_to_string('template_msg.html', {
            'message': subject,
            'full_msg': message
        })
        text_content = strip_tags(html_content)

        email = EmailMultiAlternatives(
            subject,
            text_content,
            config('EMAIL_HOST_USER'),
            [recipient_list]
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
        return True

    except Exception as e:
        print(f"Erro ao enviar e-mail para {recipient_list}: {e}")
        return False