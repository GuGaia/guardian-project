from twilio.rest import Client as ClientSMS
from decouple import config

account_sid = config('ACCOUNT_SID')
auth_token = config('AUTH_TOKEN')
sms_client = ClientSMS(account_sid, auth_token)


def send_sms(destiny_number, message):
  message = sms_client.messages.create(
    from_=config('TWILIO_NUMBER'),
    to=f"{destiny_number}",
    body=f"{message}"
  )
  
  print(message.body)

