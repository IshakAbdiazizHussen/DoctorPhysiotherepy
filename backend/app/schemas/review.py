from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


def _normalize_optional_text(value: str | None) -> str | None:
    if value is None:
        return None
    normalized_value = value.strip()
    return normalized_value or None


class ReviewCreate(BaseModel):
    doctor_id: UUID | None = None
    service_id: UUID | None = None
    rating: int = Field(ge=1, le=5)
    comment: str | None = Field(default=None, max_length=5000)

    @field_validator("comment")
    @classmethod
    def validate_comment(cls, value: str | None) -> str | None:
        return _normalize_optional_text(value)

    @model_validator(mode="after")
    def validate_target_selection(self) -> "ReviewCreate":
        if (self.doctor_id is None) == (self.service_id is None):
            raise ValueError("Exactly one review target must be provided")
        return self


class ReviewRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    doctor_id: UUID | None
    service_id: UUID | None
    rating: int
    comment: str | None
    created_at: datetime
    updated_at: datetime
