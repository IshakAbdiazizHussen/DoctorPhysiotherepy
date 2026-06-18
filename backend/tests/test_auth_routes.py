from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status
from fastapi.testclient import TestClient

from app.api.v1.routes import auth as auth_routes
from app.database.session import get_db
from app.main import app
from app.schemas.user import Token


@dataclass
class DummyUser:
    id: UUID
    full_name: str
    email: str
    hashed_password: str
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime


client = TestClient(app)


def make_user() -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="Route Test User",
        email="route-test@example.com",
        hashed_password="$2b$12$fakehashvalue",
        role="user",
        is_active=True,
        is_verified=False,
        created_at=timestamp,
        updated_at=timestamp,
    )


@pytest.fixture(autouse=True)
def clear_dependency_overrides() -> None:
    app.dependency_overrides.clear()
    yield
    app.dependency_overrides.clear()


def test_register_returns_user_read_schema(monkeypatch: pytest.MonkeyPatch) -> None:
    created_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()

    def fake_register_user(db: object, payload: object) -> DummyUser:
        assert getattr(payload, "full_name") == "Route Test User"
        assert getattr(payload, "email") == "route-test@example.com"
        assert getattr(payload, "password") == "Secure123"
        return created_user

    monkeypatch.setattr(auth_routes, "register_user", fake_register_user)

    response = client.post(
        "/api/v1/auth/register",
        json={
            "full_name": "Route Test User",
            "email": "route-test@example.com",
            "password": "Secure123",
        },
    )

    assert response.status_code == 201
    assert response.json() == {
        "id": str(created_user.id),
        "full_name": created_user.full_name,
        "email": created_user.email,
        "role": created_user.role,
        "is_active": created_user.is_active,
        "is_verified": created_user.is_verified,
        "created_at": created_user.created_at.isoformat().replace("+00:00", "Z"),
        "updated_at": created_user.updated_at.isoformat().replace("+00:00", "Z"),
    }
    assert "hashed_password" not in response.json()


def test_register_returns_duplicate_email_error(monkeypatch: pytest.MonkeyPatch) -> None:
    app.dependency_overrides[get_db] = lambda: object()

    def fake_register_user(db: object, payload: object) -> DummyUser:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )

    monkeypatch.setattr(auth_routes, "register_user", fake_register_user)

    response = client.post(
        "/api/v1/auth/register",
        json={
            "full_name": "Route Test User",
            "email": "route-test@example.com",
            "password": "Secure123",
        },
    )

    assert response.status_code == 409
    assert response.json() == {"detail": "Email is already registered"}


def test_login_returns_token_schema(monkeypatch: pytest.MonkeyPatch) -> None:
    app.dependency_overrides[get_db] = lambda: object()

    def fake_authenticate_user(db: object, payload: object) -> Token:
        assert getattr(payload, "email") == "route-test@example.com"
        assert getattr(payload, "password") == "Secure123"
        return Token(access_token="token-123", token_type="bearer")

    monkeypatch.setattr(auth_routes, "authenticate_user", fake_authenticate_user)

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "route-test@example.com",
            "password": "Secure123",
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "access_token": "token-123",
        "token_type": "bearer",
    }


def test_login_returns_bad_credentials_error(monkeypatch: pytest.MonkeyPatch) -> None:
    app.dependency_overrides[get_db] = lambda: object()

    def fake_authenticate_user(db: object, payload: object) -> Token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    monkeypatch.setattr(auth_routes, "authenticate_user", fake_authenticate_user)

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "route-test@example.com",
            "password": "WrongPassword123",
        },
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid email or password"}
    assert response.headers["www-authenticate"] == "Bearer"
