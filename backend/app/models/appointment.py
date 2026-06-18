from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import Uuid

from app.database.connection import Base

if TYPE_CHECKING:
    from app.models.doctor import Doctor
    from app.models.patient import Patient
    from app.models.service import Service


class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Appointment(Base):
    __tablename__ = "appointments"

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
    doctor_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("doctors.id"),
        nullable=False,
        index=True,
    )
    service_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("services.id"),
        nullable=False,
        index=True,
    )
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default=AppointmentStatus.PENDING.value,
        server_default=AppointmentStatus.PENDING.value,
        index=True,
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
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

    patient: Mapped["Patient"] = relationship(back_populates="appointments")
    doctor: Mapped["Doctor"] = relationship(back_populates="appointments")
    service: Mapped["Service"] = relationship(back_populates="appointments")
