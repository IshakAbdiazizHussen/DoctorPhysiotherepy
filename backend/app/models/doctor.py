from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import Uuid

from app.database.connection import Base

if TYPE_CHECKING:
    from app.models.appointment import Appointment


class Doctor(Base):
    __tablename__ = "doctors"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4,
    )
    full_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    specialty: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    credentials: Mapped[str | None] = mapped_column(String(255), nullable=True)
    years_of_experience: Mapped[int | None] = mapped_column(Integer, nullable=True)
    consultation_location: Mapped[str | None] = mapped_column(String(255), nullable=True)
    availability_summary: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_accepting_new_patients: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default="true",
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default="true",
    )
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

    appointments: Mapped[list["Appointment"]] = relationship(back_populates="doctor")
