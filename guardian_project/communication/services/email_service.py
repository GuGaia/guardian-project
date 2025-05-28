import requests
from django.http import HttpResponse
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import render
from django.core.mail import send_mail as django_send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from decouple import config

def service_send_mail(subject, message, recipient_list):
    
    html_content = render_to_string('template_msg.html', {'message': subject, 'full_msg': message})
    text_content = strip_tags(html_content)
    # print(text_content)

    # # text_content será o body
    # email = ....
    print('enviando e-mail')
    print(f"lista de destinatarios : {recipient_list}")
    # django_send_mail(
    #     subject=subject,
    #     message=text_content,
    #     from_email=config('EMAIL_HOST_USER'),
    #     recipient_list=[recipient_list]
    # )

    # email = EmailMultiAlternatives(
    #     subject=subject,
    #     body=text_content,  # Corpo do e-mail em texto plano
    #     from_email=config('EMAIL_HOST_USER'),
    #     to=[recipient_list], # recipient_list should be a list already.
    # )
    email = EmailMultiAlternatives(subject, text_content, config('EMAIL_HOST_USER'), [recipient_list])
    email.attach_alternative(html_content, "text/html")
    email.send()