from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict

from .models import RequestStatus


class SourcingRequestOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    request_id: str
    company_name: str
    owner_name: str
    phone: str
    email: EmailStr
    city: str
    product_name: str
    product_category: str
    description: Optional[str] = None
    specifications: Optional[str] = None
    quantity: str
    target_price: Optional[float] = None
    delivery_date: Optional[datetime] = None
    status: RequestStatus
    created_at: datetime


class SourcingRequestCreated(BaseModel):
    request_id: str
    status: RequestStatus
    message: str = "Your sourcing request has been received. Check your email for confirmation."
