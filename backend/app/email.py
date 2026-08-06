import smtplib
from email.message import EmailMessage
import logging
from .config import settings

logger = logging.getLogger(__name__)

def send_sourcing_email(request_id: str, company_name: str, product_name: str, email: str, phone: str, description: str):
    target_email = "Contact@paksourceconnect.com"
    
    msg = EmailMessage()
    msg['Subject'] = f"New Sourcing Request: {product_name} from {company_name}"
    msg['From'] = settings.smtp_from
    msg['To'] = target_email
    
    body = f"""A new sourcing request has been submitted.
    
Request ID: {request_id}
Company: {company_name}
Email: {email}
Phone: {phone}
Product: {product_name}
Description: {description}
"""
    msg.set_content(body)
    
    if not settings.smtp_host or not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP credentials not fully configured. Email sending skipped.")
        return

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
        logger.info(f"Sourcing request email sent for {request_id}")
    except Exception as e:
        logger.error(f"Failed to send email for {request_id}: {e}")
