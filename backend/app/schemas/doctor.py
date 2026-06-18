from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


def _normalize_required_text(value: str, field_name: str) -> str:
    normalized_value = value.strip()
    if not normalized_value:
        raise ValueError(f"{field_name} cannot be empty")
    return normalized_value


def _normalize_optional_text(value: str | None) -> str | None:
    if value is None:
        return None
    normalized_value = value.strip()
    return normalized_value or None


class DoctorBase(BaseModel):
    full_name: str = Field(min_length=1, max_length=255)
    specialty: str = Field(min_length=1, max_length=255)
    bio: str | None = Field(default=None, max_length=5000)
    credentials: str | None = Field(default=None, max_length=255)
    years_of_experience: int | None = Field(default=None, ge=0, le=80)
    consultation_location: str | None = Field(default=None, max_length=255)
    availability_summary: str | None = Field(default=None, max_length=255)
    is_accepting_new_patients: bool = True

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        return _normalize_required_text(value, "Full name")

    @field_validator("specialty")
    @classmethod
    def validate_specialty(cls, value: str) -> str:
        return _normalize_required_text(value, "Specialty")

    @field_validator(
        "bio",
        "credentials",
        "consultation_location",
        "availability_summary",
    )
    @classmethod
    def validate_optional_text_fields(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)


class DoctorCreate(DoctorBase):
    is_active: bool = True


class DoctorUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=1, max_length=255)
    specialty: str | None = Field(default=None, min_length=1, max_length=255)
    bio: str | None = Field(default=None, max_length=5000)
    credentials: str | None = Field(default=None, max_length=255)
    years_of_experience: int | None = Field(default=None, ge=0, le=80)
    consultation_location: str | None = Field(default=None, max_length=255)
    availability_summary: str | None = Field(default=None, max_length=255)
    is_accepting_new_patients: bool | None = None
    is_active: bool | None = None

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return _normalize_required_text(value, "Full name")

    @field_validator("specialty")
    @classmethod
    def validate_specialty(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return _normalize_required_text(value, "Specialty")

    @field_validator(
        "bio",
        "credentials",
        "consultation_location",
        "availability_summary",
    )
    @classmethod
    def validate_optional_text_fields(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)


class DoctorRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    full_name: str
    specialty: str
    bio: str | None
    credentials: str | None
    years_of_experience: int | None
    consultation_location: str | None
    availability_summary: str | None
    is_accepting_new_patients: bool
    created_at: datetime
    updated_at: datetime


class DoctorAdminRead(DoctorRead):
    is_active: bool
