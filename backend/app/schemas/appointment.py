from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.appointment import AppointmentStatus


def _normalize_optional_text(value: str | None) -> str | None:
    if value is None:
        return None
    normalized_value = value.strip()
    return normalized_value or None


def _validate_scheduled_at(value: datetime) -> datetime:
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError("scheduled_at must include a timezone")
    if value <= datetime.now(timezone.utc):
        raise ValueError("scheduled_at must be in the future")
    return value


class AppointmentCreate(BaseModel):
    patient_id: UUID
    doctor_id: UUID
    service_id: UUID
    scheduled_at: datetime
    notes: str | None = Field(default=None, max_length=2000)

    @field_validator("scheduled_at")
    @classmethod
    def validate_scheduled_at(cls, value: datetime) -> datetime:
        return _validate_scheduled_at(value)

    @field_validator("notes")
    @classmethod
    def validate_notes(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)


class AppointmentStatusUpdate(BaseModel):
    status: AppointmentStatus
    admin_notes: str | None = Field(default=None, max_length=2000)

    @field_validator("admin_notes")
    @classmethod
    def validate_admin_notes(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)


class AppointmentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    patient_id: UUID
    doctor_id: UUID
    service_id: UUID
    scheduled_at: datetime
    status: AppointmentStatus
    notes: str | None
    created_at: datetime
    updated_at: datetime


class AppointmentAdminRead(AppointmentRead):
    admin_notes: str | None
