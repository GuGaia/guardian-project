from contact.models import Contact
from .geocode_service import reverse_geocode
from .email_service import service_send_mail
from .sms_service import service_send_sms

def send_alert_for_client(client, lat: float = None, lon: float = None, channel_type: str=''):
    address = None
    if lat is not None and lon is not None:
        address = reverse_geocode(lat, lon)

    contacts = Contact.objects.filter(client=client)
    base_msg = getattr(client, 'default_message', None) or "alerta"
    # print(contacts)
    for contact in contacts:
        print(f"Canais do contato '{contact.name}':")
        for channel in contact.channels.all():
            channel_name = channel.name
            print(f"- {channel_name}")
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

            if channel_name == "sms":
                service_send_sms(contact.phone_number, full_msg)
            elif channel_name == "email":
                service_send_mail(client.default_message, full_msg, contact.email)
            else:
                print(f"Erro! Tipo de canal inválido: {channel_name}")
                return False
        print("-" * 20)
    return True