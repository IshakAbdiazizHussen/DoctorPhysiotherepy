from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import Boolean, CheckConstraint, DateTime, ForeignKey, Index, Integer, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import Uuid

from app.database.connection import Base

if TYPE_CHECKING:
    from app.models.doctor import Doctor
    from app.models.patient import Patient
    from app.models.service import Service


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (
        CheckConstraint(
            "(doctor_id IS NOT NULL AND service_id IS NULL) OR "
            "(doctor_id IS NULL AND service_id IS NOT NULL)",
            name="ck_reviews_exactly_one_target",
        ),
        Index(
            "ix_reviews_unique_patient_doctor",
            "patient_id",
            "doctor_id",
            unique=True,
            postgresql_where=text("doctor_id IS NOT NULL"),
        ),
        Index(
            "ix_reviews_unique_patient_service",
            "patient_id",
            "service_id",
            unique=True,
            postgresql_where=text("service_id IS NOT NULL"),
        ),
    )

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
    doctor_id: Mapped[UUID | None] = mapped_column(
        Uuid,
        ForeignKey("doctors.id"),
        nullable=True,
        index=True,
    )
    service_id: Mapped[UUID | None] = mapped_column(
        Uuid,
        ForeignKey("services.id"),
        nullable=True,
        index=True,
    )
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_visible: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default="true",
    )
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

    patient: Mapped["Patient"] = relationship(back_populates="reviews")
    doctor: Mapped["Doctor | None"] = relationship(back_populates="reviews")
    service: Mapped["Service | None"] = relationship(back_populates="reviews")
