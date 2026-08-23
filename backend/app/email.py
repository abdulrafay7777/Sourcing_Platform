import smtplib
from email.message import EmailMessage
import logging
from .config import settings

logger = logging.getLogger(__name__)

import os

def send_sourcing_email(request_id: str, company_name: str, product_name: str, email: str, phone: str, description: str, files: list = None):
    admin_email = "paksource.14@gmail.com"
    sender_name = "PakSource Connect"
    sender_address = f"{sender_name} <{settings.smtp_from}>"

    # Calculate total file size
    total_size = 0
    valid_files = []
    if files:
        for f_path, f_name, f_type in files:
            if os.path.exists(f_path):
                size = os.path.getsize(f_path)
                total_size += size
                valid_files.append((f_path, f_name, f_type, size))

    # 1. Email to the Admin (You)
    admin_msg = EmailMessage()
    admin_msg['Subject'] = f"New Sourcing Request: {product_name} from {company_name}"
    admin_msg['From'] = sender_address
    admin_msg['To'] = admin_email
    admin_msg['Reply-To'] = email
    
    admin_body = f"""A new sourcing request has been submitted.
    
Request ID: {request_id}
Company: {company_name}
Email: {email}
Phone: {phone}
Product: {product_name}
Description: {description}
"""

    if total_size > 20 * 1024 * 1024:
        pass # Limit is now enforced on frontend; this is just a silent fallback.
    
    admin_msg.set_content(admin_body)

    # Safely attach files if under 20MB total
    if total_size <= 20 * 1024 * 1024:
        import mimetypes
        for f_path, f_name, f_type, size in valid_files:
            try:
                with open(f_path, 'rb') as fp:
                    file_data = fp.read()
                maintype, subtype = f_type.split('/', 1) if '/' in f_type else ('application', 'octet-stream')
                admin_msg.add_attachment(file_data, maintype=maintype, subtype=subtype, filename=f_name)
            except Exception as e:
                logger.error(f"Failed to attach {f_name}: {e}")


    # 2. Confirmation Email to the Customer
    customer_msg = EmailMessage()
    customer_msg['Subject'] = f"We have received your sourcing request ({request_id})"
    customer_msg['From'] = sender_address
    customer_msg['To'] = email
    
    customer_body = f"""Dear {company_name},

Thank you for reaching out to PakSource Connect!

We have successfully received your sourcing request for "{product_name}". 
Our team is currently reviewing your requirements and will get back to you shortly with vetted quotations.

Your Request ID is: {request_id}

If you have any further questions, feel free to reply directly to this email.

Best regards,
The PakSource Connect Team
"""
    customer_msg.set_content(customer_body)
    
    if not settings.smtp_host or not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP credentials not fully configured. Email sending skipped.")
        return

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            # Send to admin
            server.send_message(admin_msg)
            # Send to customer
            server.send_message(customer_msg)
            
        logger.info(f"Sourcing request emails sent for {request_id}")
    except Exception as e:
        logger.error(f"Failed to send email for {request_id}: {e}")
