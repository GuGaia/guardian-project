# communication/services/alert_service.py
from contact.models import Contact 


def send_alert_for_client(client):
  contacts = Contact.objects.filter(client=client)
  
  for contact in contacts:
    channel = contact.communication_channel.name.lower()
    message = client.default_message or "Alerta enviado!"

    if channel == "sms":
        send_sms(contact.phone_number, message)
    elif channel == "email":
        send_email(contact.phone_number, message) 
    elif channel == "whatsapp":
        send_whatsapp(contact.phone_number, message)
    else:
        print(f"Canal {channel} não suportado.")

def send_sms(number, message):
    print(f"Enviando SMS para {number}: {message}")

def send_email(email, message):
    print(f"Enviando Email para {email}: {message}")

def send_whatsapp(number, message):
    print(f"Enviando WhatsApp para {number}: {message}")