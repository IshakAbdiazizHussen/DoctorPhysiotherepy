from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.core.security import BCRYPT_PASSWORD_MAX_BYTES, validate_password_bytes_length
from app.models.user import UserRole


def _normalize_full_name(value: str) -> str:
    normalized_value = value.strip()
    if not normalized_value:
        raise ValueError("Full name cannot be empty")
    return normalized_value


def _normalize_email(value: EmailStr) -> str:
    return value.lower()


def _validate_password_strength(value: str) -> str:
    validate_password_bytes_length(value)
    if any(character.isspace() for character in value):
        raise ValueError("Password cannot contain whitespace")
    if not any(character.isalpha() for character in value):
        raise ValueError("Password must include at least one letter")
    if not any(character.isdigit() for character in value):
        raise ValueError("Password must include at least one number")
    return value


class UserCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=255)

    _validate_full_name = field_validator("full_name")(_normalize_full_name)
    _validate_email = field_validator("email", mode="after")(_normalize_email)
    _validate_password = field_validator("password")(_validate_password_strength)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=255)

    _validate_email = field_validator("email", mode="after")(_normalize_email)


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    full_name: str
    email: EmailStr
    role: UserRole
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime


class UserUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=1, max_length=255)
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8, max_length=255)
    role: UserRole | None = None
    is_active: bool | None = None
    is_verified: bool | None = None

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return _normalize_full_name(value)

    @field_validator("email", mode="after")
    @classmethod
    def validate_email(cls, value: EmailStr | None) -> str | None:
        if value is None:
            return None
        return _normalize_email(value)

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return _validate_password_strength(value)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: str | None = None
    exp: int | None = None
