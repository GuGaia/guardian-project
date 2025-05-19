from contact.models import Contact
from .geocode_service import reverse_geocode

def send_alert_for_client(client, lat: float = None, lon: float = None):
    address = None
    if lat is not None and lon is not None:
        address = reverse_geocode(lat, lon)

    contacts = Contact.objects.filter(client=client)
    base_msg = getattr(client, 'default_message', None) or "alerta"

    for contact in contacts:
        channel = contact.channel.name.lower()

        if lat is not None and lon is not None:
            loc_text = f"Coordenadas: {lat}, {lon}."
            if address:
                loc_text += f" Endereço: {address}"
            else:
                loc_text += (
                    " Veja no mapa: "
                    f"https://www.google.com/maps/search/?api=1&query={lat},{lon}"
                )
            full_msg = f"{base_msg}\n{loc_text}"
        else:
            full_msg = base_msg

        if channel == "sms":
            send_sms(contact.phone_number, full_msg)
        elif channel == "email":
            send_email(contact.email, full_msg)
#        elif channel == "whatsapp":
#            send_whatsapp(contact.phone_number, full_msg)

def send_sms(number, message):
    print(f"Enviando SMS para {number}: {message}")

def send_email(email, message):
    print(f"Enviando Email para {email}: {message}")

# def send_whatsapp(number, message):
#    print(f"Enviando WhatsApp para {number}: {message}")
