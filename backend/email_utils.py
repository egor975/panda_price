import smtplib
from email.message import EmailMessage

def send_reset_code(to_email, code):
    msg = EmailMessage()
    msg.set_content(f"Ваш код восстановления: {code}")
    msg["Subject"] = "Восстановление пароля Panda Price"
    msg["From"] = "your@email.com"
    msg["To"] = to_email

    with smtplib.SMTP("smtp.yandex.com", 587) as s:
        s.starttls()
        s.login("your@email.com", "your_password")
        s.send_message(msg)