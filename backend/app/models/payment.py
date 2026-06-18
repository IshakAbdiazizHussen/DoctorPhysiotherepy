from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import Uuid

from app.database.connection import Base

if TYPE_CHECKING:
    from app.models.appointment import Appointment
    from app.models.patient import Patient
    from app.models.service import Service


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class PaymentMethod(str, Enum):
    CASH = "cash"
    CARD = "card"
    BANK_TRANSFER = "bank_transfer"
    MOBILE_MONEY = "mobile_money"


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )
    patient_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("patients.id"),
        nullable=False,
        index=True,
    )
    appointment_id: Mapped[UUID | None] = mapped_column(
        Uuid,
        ForeignKey("appointments.id"),
        nullable=True,
        index=True,
    )
    service_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("services.id"),
        nullable=False,
        index=True,
    )
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(
        String(3),
        nullable=False,
        default="USD",
        server_default="USD",
    )
    method: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default=PaymentStatus.PENDING.value,
        server_default=PaymentStatus.PENDING.value,
        index=True,
    )
    external_reference: Mapped[str | None] = mapped_column(String(255), nullable=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    patient: Mapped["Patient"] = relationship(back_populates="payments")
    appointment: Mapped["Appointment | None"] = relationship(back_populates="payments")
    service: Mapped["Service"] = relationship(back_populates="payments")
