from twilio.rest import Client as ClientSMS
from twilio.base.exceptions import TwilioRestException
from decouple import config

account_sid = config('ACCOUNT_SID')
auth_token = config('AUTH_TOKEN')
sms_client = ClientSMS(account_sid, auth_token)

# def service_send_sms(destiny_number, message):
#   message = sms_client.messages.create(
#     from_=config('TWILIO_NUMBER'),
#     to=f"{destiny_number}",
#     body=f"{message}"
#   )
  
#   print(message.body)


def service_send_sms(destiny_number, message):
    try:
        message = sms_client.messages.create(
            from_=config('TWILIO_NUMBER'),
            to=f"{destiny_number}",
            body=f"{message}"
        )
        print(message.body)
        return True
    except TwilioRestException as e:
        print(f"Erro ao enviar SMS: {str(e)}")
        return False
    except Exception as e:
        print(f"Erro inesperado ao enviar SMS: {str(e)}")
        return False