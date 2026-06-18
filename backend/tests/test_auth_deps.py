from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.api import deps as auth_deps
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import UserRole


@dataclass
class DummyUser:
    id: UUID
    full_name: str
    email: str
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime


def make_user(*, role: str = UserRole.USER.value, is_active: bool = True) -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="Test User",
        email="test@example.com",
        role=role,
        is_active=is_active,
        is_verified=False,
        created_at=timestamp,
        updated_at=timestamp,
    )


def test_me_rejects_missing_bearer_token(client) -> None:
    response = client.get("/api/v1/auth/me")

    assert response.status_code == 401
    assert response.json() == {"detail": "Missing bearer token"}
    assert response.headers["www-authenticate"] == "Bearer"


def test_me_rejects_invalid_bearer_token(client) -> None:
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer not-a-valid-token"},
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid or expired token"}
    assert response.headers["www-authenticate"] == "Bearer"


def test_me_rejects_unknown_user(client, monkeypatch: pytest.MonkeyPatch) -> None:
    from app.main import app

    app.dependency_overrides[get_db] = lambda: object()
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: None)

    token = create_access_token(str(uuid4()))
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "User not found"}
    assert response.headers["www-authenticate"] == "Bearer"


def test_me_rejects_inactive_user(client, monkeypatch: pytest.MonkeyPatch) -> None:
    from app.main import app

    inactive_user = make_user(is_active=False)

    app.dependency_overrides[get_db] = lambda: object()
    monkeypatch.setattr(
        auth_deps,
        "_resolve_subject_to_user",
        lambda db, subject: inactive_user,
    )

    token = create_access_token(str(inactive_user.id))
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Inactive user"}


def test_me_rejects_token_without_subject(client, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(auth_deps, "decode_access_token", lambda token: {"exp": 9999999999})

    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer valid-structure-but-no-subject"},
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Token subject is missing"}
    assert response.headers["www-authenticate"] == "Bearer"


def test_me_returns_current_active_user(client, monkeypatch: pytest.MonkeyPatch) -> None:
    from app.main import app

    current_user = make_user()

    app.dependency_overrides[get_db] = lambda: object()
    monkeypatch.setattr(
        auth_deps,
        "_resolve_subject_to_user",
        lambda db, subject: current_user,
    )

    token = create_access_token(str(current_user.id))
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    response_payload = response.json()

    assert response_payload == {
        "id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "is_verified": current_user.is_verified,
        "created_at": current_user.created_at.isoformat().replace("+00:00", "Z"),
        "updated_at": current_user.updated_at.isoformat().replace("+00:00", "Z"),
    }


def test_require_roles_rejects_user_without_required_role() -> None:
    current_user = make_user(role=UserRole.USER.value)
    admin_only_dependency = auth_deps.require_roles(UserRole.ADMIN)

    with pytest.raises(HTTPException) as exc_info:
        admin_only_dependency(current_user)

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Not enough permissions"


def test_require_admin_accepts_admin_user() -> None:
    admin_user = make_user(role=UserRole.ADMIN.value)

    assert auth_deps.require_admin(admin_user) is admin_user


def test_require_roles_rejects_empty_role_configuration() -> None:
    with pytest.raises(ValueError) as exc_info:
        auth_deps.require_roles()

    assert str(exc_info.value) == "At least one allowed role must be provided"
