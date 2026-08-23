import resend
import logging
from .config import settings

logger = logging.getLogger(__name__)

import os

def send_sourcing_email(request_id: str, company_name: str, product_name: str, email: str, phone: str, description: str, files: list = None):
    admin_email = "paksource.14@gmail.com"
    sender_address = f"PakSource Connect <{settings.smtp_from}>"

    # Configure Resend
    resend.api_key = settings.resend_api_key
    if not resend.api_key:
        logger.warning("Resend API key not configured. Email sending skipped.")
        return

    # Calculate total file size and prepare attachments
    total_size = 0
    resend_attachments = []
    
    if files:
        for f_path, f_name, f_type in files:
            if os.path.exists(f_path):
                size = os.path.getsize(f_path)
                total_size += size
                if total_size <= 20 * 1024 * 1024:
                    try:
                        with open(f_path, "rb") as f:
                            file_data = f.read()
                            resend_attachments.append({
                                "filename": f_name,
                                "content": list(file_data)
                            })
                    except Exception as e:
                        logger.error(f"Failed to attach {f_name}: {e}")

    admin_body = f"""<p>A new sourcing request has been submitted.</p>
    <ul>
        <li><b>Request ID:</b> {request_id}</li>
        <li><b>Company:</b> {company_name}</li>
        <li><b>Email:</b> {email}</li>
        <li><b>Phone:</b> {phone}</li>
        <li><b>Product:</b> {product_name}</li>
    </ul>
    <p><b>Description:</b><br>{description}</p>
    """

    customer_body = f"""<p>Dear {company_name},</p>
    <p>Thank you for reaching out to PakSource Connect!</p>
    <p>We have successfully received your sourcing request for "<b>{product_name}</b>". 
    Our team is currently reviewing your requirements and will get back to you shortly with vetted quotations.</p>
    <p>Your Request ID is: <b>{request_id}</b></p>
    <p>If you have any further questions, feel free to reply directly to this email.</p>
    <p>Best regards,<br>The PakSource Connect Team</p>
    """

    try:
        # Send to admin
        admin_params = {
            "from": sender_address,
            "to": admin_email,
            "reply_to": email,
            "subject": f"New Sourcing Request: {product_name} from {company_name}",
            "html": admin_body,
            "attachments": resend_attachments
        }
        # If there are no attachments, we shouldn't send an empty list, some APIs complain
        if not resend_attachments:
            admin_params.pop("attachments", None)
            
        resend.Emails.send(admin_params)

        # Send to customer
        customer_params = {
            "from": sender_address,
            "to": email,
            "subject": f"We have received your sourcing request ({request_id})",
            "html": customer_body
        }
        resend.Emails.send(customer_params)
            
        logger.info(f"Sourcing request emails sent for {request_id}")
    except Exception as e:
        logger.error(f"Failed to send email for {request_id}: {e}")
