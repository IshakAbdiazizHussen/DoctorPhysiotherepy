from __future__ import annotations

from datetime import datetime, timezone
from types import SimpleNamespace
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.core.security import BCRYPT_PASSWORD_MAX_BYTES
from app.models.user import UserRole
from app.schemas.user import UserCreate, UserLogin, UserRead, UserUpdate


def test_user_create_normalizes_name_and_email() -> None:
    payload = UserCreate(
        full_name="  Ahmed Ali  ",
        email="Ahmed@example.COM",
        password="secure123",
    )

    assert payload.full_name == "Ahmed Ali"
    assert payload.email == "ahmed@example.com"


@pytest.mark.parametrize(
    ("password", "expected_message"),
    [
        ("password", "Password must include at least one number"),
        ("12345678", "Password must include at least one letter"),
        ("secure 123", "Password cannot contain whitespace"),
    ],
)
def test_user_create_rejects_weak_passwords(password: str, expected_message: str) -> None:
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(
            full_name="Ahmed Ali",
            email="ahmed@example.com",
            password=password,
        )

    assert expected_message in str(exc_info.value)


def test_user_login_accepts_short_password_for_existing_accounts() -> None:
    payload = UserLogin(email="USER@example.com", password="x")

    assert payload.email == "user@example.com"
    assert payload.password == "x"


def test_user_create_rejects_passwords_over_bcrypt_limit() -> None:
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(
            full_name="Ahmed Ali",
            email="ahmed@example.com",
            password=("a" * (BCRYPT_PASSWORD_MAX_BYTES - 1)) + "1b",
        )

    assert f"Password cannot be longer than {BCRYPT_PASSWORD_MAX_BYTES} bytes." in str(exc_info.value)


def test_user_update_restricts_role_values() -> None:
    payload = UserUpdate(role=UserRole.ADMIN)
    assert payload.role == UserRole.ADMIN

    with pytest.raises(ValidationError):
        UserUpdate(role="doctor")


def test_user_read_excludes_hashed_password_from_output() -> None:
    user = SimpleNamespace(
        id=uuid4(),
        full_name="Ahmed Ali",
        email="ahmed@example.com",
        hashed_password="super-secret-hash",
        role=UserRole.USER.value,
        is_active=True,
        is_verified=False,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )

    payload = UserRead.model_validate(user)

    assert payload.role == UserRole.USER
    assert "hashed_password" not in payload.model_dump()
