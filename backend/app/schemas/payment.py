from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.models.payment import PaymentMethod, PaymentStatus


def _normalize_optional_text(value: str | None) -> str | None:
    if value is None:
        return None
    normalized_value = value.strip()
    return normalized_value or None


class PaymentCreate(BaseModel):
    patient_id: UUID
    appointment_id: UUID | None = None
    service_id: UUID
    amount: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    currency: str = Field(default="USD", min_length=3, max_length=3)
    method: PaymentMethod

    @field_validator("currency")
    @classmethod
    def validate_currency(cls, value: str) -> str:
        return value.strip().upper()


class PaymentStatusUpdate(BaseModel):
    status: PaymentStatus
    external_reference: str | None = Field(default=None, max_length=255)
    admin_notes: str | None = Field(default=None, max_length=2000)

    @field_validator("external_reference", "admin_notes")
    @classmethod
    def validate_optional_text_fields(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)

    @model_validator(mode="after")
    def validate_external_reference_usage(self) -> "PaymentStatusUpdate":
        if self.status != PaymentStatus.PAID and self.external_reference is not None:
            raise ValueError("external_reference can only be set when marking a payment as paid")
        return self


class PaymentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    patient_id: UUID
    appointment_id: UUID | None
    service_id: UUID
    amount: Decimal
    currency: str
    method: PaymentMethod
    status: PaymentStatus
    created_at: datetime
    updated_at: datetime


class PaymentAdminRead(PaymentRead):
    external_reference: str | None
    admin_notes: str | None
