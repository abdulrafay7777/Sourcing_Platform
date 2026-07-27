import enum
import uuid
from datetime import datetime

from sqlalchemy import String, Text, DateTime, Enum, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class RequestStatus(str, enum.Enum):
    SUBMITTED = "submitted"
    PAYMENT_PENDING = "payment_pending"
    PAYMENT_CONFIRMED = "payment_confirmed"
    SOURCING_IN_PROGRESS = "sourcing_in_progress"
    QUOTATION_SENT = "quotation_sent"
    QUOTATION_APPROVED = "quotation_approved"
    BULK_ORDER_PLACED = "bulk_order_placed"
    IN_PRODUCTION = "in_production"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


def generate_request_id() -> str:
    # e.g. PSC-8F3A21C4
    return f"PSC-{uuid.uuid4().hex[:8].upper()}"


class SourcingRequest(Base):
    __tablename__ = "sourcing_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    request_id: Mapped[str] = mapped_column(String(20), unique=True, index=True, default=generate_request_id)

    company_name: Mapped[str] = mapped_column(String(255))
    owner_name: Mapped[str] = mapped_column(String(255))
    phone: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(255))
    city: Mapped[str] = mapped_column(String(100))

    product_name: Mapped[str] = mapped_column(String(255))
    product_category: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text, nullable=True)
    specifications: Mapped[str] = mapped_column(Text, nullable=True)
    quantity: Mapped[str] = mapped_column(String(100))
    target_price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=True)
    delivery_date: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    status: Mapped[RequestStatus] = mapped_column(Enum(RequestStatus), default=RequestStatus.SUBMITTED)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    files: Mapped[list["RequestFile"]] = relationship(back_populates="request", cascade="all, delete-orphan")


class RequestFile(Base):
    __tablename__ = "request_files"

    id: Mapped[int] = mapped_column(primary_key=True)
    request_id: Mapped[int] = mapped_column(ForeignKey("sourcing_requests.id"))
    filename: Mapped[str] = mapped_column(String(500))
    stored_path: Mapped[str] = mapped_column(String(500))
    content_type: Mapped[str] = mapped_column(String(100))
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    request: Mapped["SourcingRequest"] = relationship(back_populates="files")
