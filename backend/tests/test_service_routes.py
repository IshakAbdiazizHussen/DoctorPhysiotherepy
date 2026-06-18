from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from decimal import Decimal
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.api import deps as auth_deps
from app.api.v1.routes import services as service_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import UserRole


@dataclass
class DummyService:
    id: UUID
    name: str
    category: str
    short_description: str | None
    description: str | None
    duration_minutes: int | None
    price: Decimal | None
    is_active: bool
    created_at: datetime
    updated_at: datetime


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


def make_service(*, is_active: bool = True) -> DummyService:
    timestamp = datetime.now(timezone.utc)
    return DummyService(
        id=uuid4(),
        name="Sports Rehabilitation",
        category="Rehabilitation",
        short_description="Targeted recovery support.",
        description="A guided rehabilitation program for sports injuries.",
        duration_minutes=60,
        price=Decimal("75.00"),
        is_active=is_active,
        created_at=timestamp,
        updated_at=timestamp,
    )


def make_user(*, role: str) -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="System User",
        email=f"{role}@example.com",
        role=role,
        is_active=True,
        is_verified=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def authorize_request_as(user: DummyUser, monkeypatch: pytest.MonkeyPatch) -> str:
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: user)
    return create_access_token(str(user.id))


def test_list_services_returns_public_service_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    service = make_service()
    captured_filters: dict[str, object] = {}

    def fake_get_services_for_public(
        db: object,
        *,
        category: str | None = None,
    ) -> list[DummyService]:
        captured_filters["category"] = category
        return [service]

    monkeypatch.setattr(service_routes, "get_services_for_public", fake_get_services_for_public)

    response = client.get(
        "/api/v1/services",
        params={"category": "Rehabilitation"},
    )

    assert response.status_code == 200
    assert captured_filters == {"category": "Rehabilitation"}
    assert response.json() == [
        {
            "id": str(service.id),
            "name": service.name,
            "category": service.category,
            "short_description": service.short_description,
            "description": service.description,
            "duration_minutes": service.duration_minutes,
            "price": "75.00",
            "created_at": service.created_at.isoformat().replace("+00:00", "Z"),
            "updated_at": service.updated_at.isoformat().replace("+00:00", "Z"),
        }
    ]
    assert "is_active" not in response.json()[0]


def test_get_service_returns_public_detail(client, monkeypatch: pytest.MonkeyPatch) -> None:
    service = make_service()
    monkeypatch.setattr(service_routes, "get_service_for_public", lambda db, service_id: service)

    response = client.get(f"/api/v1/services/{service.id}")

    assert response.status_code == 200
    assert response.json()["id"] == str(service.id)
    assert response.json()["name"] == service.name
    assert "is_active" not in response.json()


def test_create_service_rejects_non_admin_user(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    app.dependency_overrides[get_db] = lambda: object()
    user_token = authorize_request_as(
        make_user(role=UserRole.USER.value),
        monkeypatch,
    )

    response = client.post(
        "/api/v1/services",
        headers={"Authorization": f"Bearer {user_token}"},
        json={
            "name": "Sports Rehabilitation",
            "category": "Rehabilitation",
            "short_description": "Targeted recovery support.",
            "description": "A guided rehabilitation program for sports injuries.",
            "duration_minutes": 60,
            "price": "75.00",
            "is_active": True,
        },
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}


def test_create_service_returns_admin_payload_for_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    service = make_service()
    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    monkeypatch.setattr(service_routes, "create_service_record", lambda db, payload: service)

    response = client.post(
        "/api/v1/services",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "name": service.name,
            "category": service.category,
            "short_description": service.short_description,
            "description": service.description,
            "duration_minutes": service.duration_minutes,
            "price": "75.00",
            "is_active": service.is_active,
        },
    )

    assert response.status_code == 201
    assert response.json()["id"] == str(service.id)
    assert response.json()["is_active"] is True


def test_create_service_rejects_invalid_price_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    response = client.post(
        "/api/v1/services",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "name": "Sports Rehabilitation",
            "category": "Rehabilitation",
            "duration_minutes": 60,
            "price": "-1.00",
            "is_active": True,
        },
    )

    assert response.status_code == 422


def test_update_service_returns_admin_payload_for_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    service = make_service(is_active=False)
    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    monkeypatch.setattr(
        service_routes,
        "update_service_record",
        lambda db, service_id, payload: service,
    )

    response = client.put(
        f"/api/v1/services/{service.id}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"is_active": False, "price": "75.00"},
    )

    assert response.status_code == 200
    assert response.json()["id"] == str(service.id)
    assert response.json()["is_active"] is False


def test_delete_service_rejects_missing_token(client) -> None:
    response = client.delete(f"/api/v1/services/{uuid4()}")

    assert response.status_code == 401
    assert response.json() == {"detail": "Missing bearer token"}


def test_update_service_returns_not_found_error_for_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    def fake_update_service_record(db: object, service_id: UUID, payload: object) -> DummyService:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )

    monkeypatch.setattr(service_routes, "update_service_record", fake_update_service_record)

    response = client.put(
        f"/api/v1/services/{uuid4()}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"price": "90.00"},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Service not found"}
