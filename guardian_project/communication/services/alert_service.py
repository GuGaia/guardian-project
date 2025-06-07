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
                full_msg = f"{contact.name}\n {base_msg}\n{loc_text}\n"
            else:
                full_msg = base_msg + f"{contact.name}\n" + f"\n"

            print(f"full msg {full_msg}")
            if channel_name == "sms":
                full_message_sms =  base_msg + f"https://www.google.com/maps/search/?api=1&query={lat},{lon}"
                success = service_send_sms(contact.phone_number, full_message_sms)
                if not success:
                    print(f"Falha ao enviar SMS para {contact.phone_number}")
                    return False
            elif channel_name == "email":
                success = service_send_mail(client.default_message, full_msg, contact.email)
                if not success:
                    print(f"Falha ao enviar e-mail para {contact.email}")
                    return False
            else:
                print(f"Erro! Tipo de canal inválido: {channel_name}")
                return False
        print("-" * 20)
    return True