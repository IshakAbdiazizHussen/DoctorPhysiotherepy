from __future__ import annotations

from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


def _normalize_optional_text(value: str | None) -> str | None:
    if value is None:
        return None
    normalized_value = value.strip()
    return normalized_value or None


class PatientRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    date_of_birth: date | None
    phone_number: str | None
    address: str | None
    emergency_contact_name: str | None
    emergency_contact_phone: str | None
    created_at: datetime
    updated_at: datetime


class PatientAdminRead(PatientRead):
    admin_notes: str | None
    is_active: bool


class PatientCreate(BaseModel):
    user_id: UUID
    date_of_birth: date | None = None
    phone_number: str | None = Field(default=None, max_length=50)
    address: str | None = Field(default=None, max_length=255)
    emergency_contact_name: str | None = Field(default=None, max_length=255)
    emergency_contact_phone: str | None = Field(default=None, max_length=50)
    admin_notes: str | None = Field(default=None, max_length=5000)
    is_active: bool = True

    @field_validator(
        "phone_number",
        "address",
        "emergency_contact_name",
        "emergency_contact_phone",
        "admin_notes",
    )
    @classmethod
    def validate_optional_text_fields(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)


class PatientSelfUpdate(BaseModel):
    date_of_birth: date | None = None
    phone_number: str | None = Field(default=None, max_length=50)
    address: str | None = Field(default=None, max_length=255)
    emergency_contact_name: str | None = Field(default=None, max_length=255)
    emergency_contact_phone: str | None = Field(default=None, max_length=50)

    @field_validator(
        "phone_number",
        "address",
        "emergency_contact_name",
        "emergency_contact_phone",
    )
    @classmethod
    def validate_optional_text_fields(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)


class PatientAdminUpdate(BaseModel):
    date_of_birth: date | None = None
    phone_number: str | None = Field(default=None, max_length=50)
    address: str | None = Field(default=None, max_length=255)
    emergency_contact_name: str | None = Field(default=None, max_length=255)
    emergency_contact_phone: str | None = Field(default=None, max_length=50)
    admin_notes: str | None = Field(default=None, max_length=5000)
    is_active: bool | None = None

    @field_validator(
        "phone_number",
        "address",
        "emergency_contact_name",
        "emergency_contact_phone",
        "admin_notes",
    )
    @classmethod
    def validate_optional_text_fields(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)
