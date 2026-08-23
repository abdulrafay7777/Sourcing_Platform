import os
import shutil
import uuid
from datetime import datetime, date
from typing import Optional, List

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import SourcingRequest, RequestFile
from ..schemas import SourcingRequestOut, SourcingRequestCreated
from ..email import send_sourcing_email

router = APIRouter(prefix="/api/sourcing-requests", tags=["sourcing-requests"])

UPLOAD_DIR = os.environ.get("UPLOAD_DIR", os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "application/pdf",
                 "application/msword",
                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB

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
    delivery_date: Optional[date] = Form(None),
    files: Optional[List[UploadFile]] = File(None),
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
        delivery_date=datetime.combine(delivery_date, datetime.min.time()) if delivery_date else None,
    )
    db.add(sourcing_request)
    db.flush()  # get the auto-increment id before commit

    saved_files = []
    total_size = 0
    for upload in files or []:
        if upload.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, f"File type not allowed: {upload.content_type}")
        contents = await upload.read()
        total_size += len(contents)
        if total_size > 20 * 1024 * 1024:
            raise HTTPException(400, "Total file size exceeds the 20MB limit.")
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(400, f"File too large: {upload.filename}")

        safe_name = f"{uuid.uuid4().hex}_{upload.filename}"
        stored_path = os.path.join(UPLOAD_DIR, safe_name)
        with open(stored_path, "wb") as f:
            f.write(contents)
            
        saved_files.append((stored_path, upload.filename, upload.content_type))

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
        description=sourcing_request.description or "",
        files=saved_files
    )
    # WhatsApp notification TODO left for later

    return SourcingRequestCreated(request_id=sourcing_request.request_id, status=sourcing_request.status)


@router.get("/{request_id}", response_model=SourcingRequestOut)
def get_sourcing_request(request_id: str, db: Session = Depends(get_db)):
    req = db.query(SourcingRequest).filter(SourcingRequest.request_id == request_id).first()
    if not req:
        raise HTTPException(404, "Request not found")
    return req
