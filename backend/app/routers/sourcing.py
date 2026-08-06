import os
import shutil
import uuid
from datetime import datetime
from typing import Optional, List

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import SourcingRequest, RequestFile
from ..schemas import SourcingRequestOut, SourcingRequestCreated
from ..email import send_sourcing_email

router = APIRouter(prefix="/api/sourcing-requests", tags=["sourcing-requests"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "application/pdf",
                 "application/msword",
                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("", response_model=SourcingRequestCreated, status_code=201)
async def create_sourcing_request(
    background_tasks: BackgroundTasks,
    company_name: str = Form(...),
    owner_name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    city: str = Form(...),
    product_name: str = Form(...),
    product_category: str = Form(...),
    description: Optional[str] = Form(None),
    specifications: Optional[str] = Form(None),
    quantity: str = Form(...),
    target_price: Optional[float] = Form(None),
    delivery_date: Optional[datetime] = Form(None),
    files: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
):
    sourcing_request = SourcingRequest(
        company_name=company_name,
        owner_name=owner_name,
        phone=phone,
        email=email,
        city=city,
        product_name=product_name,
        product_category=product_category,
        description=description,
        specifications=specifications,
        quantity=quantity,
        target_price=target_price,
        delivery_date=delivery_date,
    )
    db.add(sourcing_request)
    db.flush()  # get the auto-increment id before commit

    for upload in files:
        if upload.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, f"File type not allowed: {upload.content_type}")
        contents = await upload.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(400, f"File too large: {upload.filename}")

        safe_name = f"{uuid.uuid4().hex}_{upload.filename}"
        stored_path = os.path.join(UPLOAD_DIR, safe_name)
        with open(stored_path, "wb") as f:
            f.write(contents)

        db.add(RequestFile(
            request_id=sourcing_request.id,
            filename=upload.filename,
            stored_path=stored_path,
            content_type=upload.content_type,
        ))

    db.commit()
    db.refresh(sourcing_request)

    background_tasks.add_task(
        send_sourcing_email,
        request_id=sourcing_request.request_id,
        company_name=sourcing_request.company_name,
        product_name=sourcing_request.product_name,
        email=sourcing_request.email,
        phone=sourcing_request.phone,
        description=sourcing_request.description or ""
    )
    # WhatsApp notification TODO left for later

    return SourcingRequestCreated(request_id=sourcing_request.request_id, status=sourcing_request.status)


@router.get("/{request_id}", response_model=SourcingRequestOut)
def get_sourcing_request(request_id: str, db: Session = Depends(get_db)):
    req = db.query(SourcingRequest).filter(SourcingRequest.request_id == request_id).first()
    if not req:
        raise HTTPException(404, "Request not found")
    return req
