from __future__ import annotations

from dataclasses import dataclass
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.services import auth_service
from app.schemas.user import UserCreate, UserLogin


@dataclass
class DummyUser:
    id: UUID
    email: str
    hashed_password: str


def make_user(*, email: str = "service-test@example.com") -> DummyUser:
    return DummyUser(
        id=uuid4(),
        email=email,
        hashed_password="stored-hash",
    )


def test_register_user_rejects_duplicate_email(monkeypatch: pytest.MonkeyPatch) -> None:
    existing_user = make_user()
    payload = UserCreate(
        full_name="Service Test User",
        email=existing_user.email,
        password="Secure123",
    )

    monkeypatch.setattr(auth_service, "get_user_by_email", lambda db, email: existing_user)

    with pytest.raises(HTTPException) as exc_info:
        auth_service.register_user(object(), payload)

    assert exc_info.value.status_code == 409
    assert exc_info.value.detail == "Email is already registered"


def test_register_user_hashes_password_before_creating_user(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = UserCreate(
        full_name="Service Test User",
        email="service-test@example.com",
        password="Secure123",
    )
    captured_create_args: dict[str, str] = {}

    monkeypatch.setattr(auth_service, "get_user_by_email", lambda db, email: None)
    monkeypatch.setattr(auth_service, "hash_password", lambda password: "hashed-secure-123")

    def fake_create_user(db: object, **kwargs: str) -> DummyUser:
        captured_create_args.update(kwargs)
        return make_user(email=kwargs["email"])

    monkeypatch.setattr(auth_service, "create_user", fake_create_user)

    created_user = auth_service.register_user(object(), payload)

    assert created_user.email == payload.email
    assert captured_create_args == {
        "full_name": payload.full_name,
        "email": payload.email,
        "hashed_password": "hashed-secure-123",
    }


def test_authenticate_user_rejects_unknown_email(monkeypatch: pytest.MonkeyPatch) -> None:
    payload = UserLogin(
        email="missing@example.com",
        password="Secure123",
    )

    monkeypatch.setattr(auth_service, "get_user_by_email", lambda db, email: None)

    with pytest.raises(HTTPException) as exc_info:
        auth_service.authenticate_user(object(), payload)

    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Invalid email or password"
    assert exc_info.value.headers == {"WWW-Authenticate": "Bearer"}


def test_authenticate_user_rejects_bad_password(monkeypatch: pytest.MonkeyPatch) -> None:
    user = make_user()
    payload = UserLogin(
        email=user.email,
        password="WrongPassword123",
    )

    monkeypatch.setattr(auth_service, "get_user_by_email", lambda db, email: user)
    monkeypatch.setattr(auth_service, "verify_password", lambda password, hashed: False)

    with pytest.raises(HTTPException) as exc_info:
        auth_service.authenticate_user(object(), payload)

    assert exc_info.value.status_code == 401
    assert exc_info.value.detail == "Invalid email or password"


def test_authenticate_user_returns_bearer_token(monkeypatch: pytest.MonkeyPatch) -> None:
    user = make_user()
    payload = UserLogin(
        email=user.email,
        password="Secure123",
    )

    monkeypatch.setattr(auth_service, "get_user_by_email", lambda db, email: user)
    monkeypatch.setattr(auth_service, "verify_password", lambda password, hashed: True)
    monkeypatch.setattr(auth_service, "create_access_token", lambda subject: "jwt-token-123")

    token = auth_service.authenticate_user(object(), payload)

    assert token.access_token == "jwt-token-123"
    assert token.token_type == "bearer"
