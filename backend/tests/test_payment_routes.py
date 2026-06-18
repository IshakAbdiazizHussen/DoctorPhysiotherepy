from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from decimal import Decimal
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.api import deps as auth_deps
from app.api.v1.routes import payments as payment_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.payment import PaymentMethod, PaymentStatus
from app.models.user import UserRole


@dataclass
class DummyPayment:
    id: UUID
    patient_id: UUID
    appointment_id: UUID | None
    service_id: UUID
    amount: Decimal
    currency: str
    method: str
    status: str
    external_reference: str | None
    admin_notes: str | None
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


def make_user(*, role: str = UserRole.USER.value) -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="Payment User",
        email=f"{role}-{uuid4().hex[:8]}@example.com",
        role=role,
        is_active=True,
        is_verified=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def make_payment(*, status_value: PaymentStatus) -> DummyPayment:
    timestamp = datetime.now(timezone.utc)
    return DummyPayment(
        id=uuid4(),
        patient_id=uuid4(),
        appointment_id=uuid4(),
        service_id=uuid4(),
        amount=Decimal("85.00"),
        currency="USD",
        method=PaymentMethod.CARD.value,
        status=status_value.value,
        external_reference="gateway-ref-123",
        admin_notes="Internal payment note.",
        created_at=timestamp,
        updated_at=timestamp,
    )


def authorize_request_as(user: DummyUser, monkeypatch: pytest.MonkeyPatch) -> str:
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: user)
    return create_access_token(str(user.id))


def test_create_payment_returns_owner_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    payment = make_payment(status_value=PaymentStatus.PENDING)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    monkeypatch.setattr(payment_routes, "create_payment_record", lambda db, current_user, payload: payment)

    response = client.post(
        "/api/v1/payments",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "patient_id": str(payment.patient_id),
            "appointment_id": str(payment.appointment_id),
            "service_id": str(payment.service_id),
            "amount": "85.00",
            "currency": "usd",
            "method": PaymentMethod.CARD.value,
        },
    )

    assert response.status_code == 201
    assert response.json()["patient_id"] == str(payment.patient_id)
    assert response.json()["status"] == PaymentStatus.PENDING.value
    assert "admin_notes" not in response.json()
    assert "external_reference" not in response.json()


def test_list_payments_returns_owner_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    payment = make_payment(status_value=PaymentStatus.PENDING)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)
    captured_filters: dict[str, object] = {}

    def fake_list_payments_for_current_user(
        db: object,
        current_user: DummyUser,
        *,
        patient_id: UUID | None = None,
        appointment_id: UUID | None = None,
        service_id: UUID | None = None,
        status_filter: PaymentStatus | None = None,
        method_filter: PaymentMethod | None = None,
    ) -> list[DummyPayment]:
        captured_filters["status_filter"] = status_filter
        captured_filters["method_filter"] = method_filter
        return [payment]

    monkeypatch.setattr(
        payment_routes,
        "list_payments_for_current_user",
        fake_list_payments_for_current_user,
    )

    response = client.get(
        "/api/v1/payments",
        headers={"Authorization": f"Bearer {token}"},
        params={"status": PaymentStatus.PENDING.value, "method": PaymentMethod.CARD.value},
    )

    assert response.status_code == 200
    assert captured_filters["status_filter"] == PaymentStatus.PENDING
    assert captured_filters["method_filter"] == PaymentMethod.CARD
    assert response.json()[0]["id"] == str(payment.id)
    assert "admin_notes" not in response.json()[0]


def test_get_payment_rejects_different_user(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    def fake_get_payment_for_owner_or_admin(db: object, payment_id: UUID, current_user: DummyUser) -> DummyPayment:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Payment access is not allowed",
        )

    monkeypatch.setattr(
        payment_routes,
        "get_payment_for_owner_or_admin",
        fake_get_payment_for_owner_or_admin,
    )

    response = client.get(
        f"/api/v1/payments/{uuid4()}",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Payment access is not allowed"}


def test_admin_list_payments_returns_admin_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    payment = make_payment(status_value=PaymentStatus.PAID)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(payment_routes, "list_payments_for_admin", lambda db, **filters: [payment])

    response = client.get(
        "/api/v1/payments/admin",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    assert response.json()[0]["id"] == str(payment.id)
    assert response.json()[0]["admin_notes"] == payment.admin_notes
    assert response.json()[0]["external_reference"] == payment.external_reference


def test_admin_list_payments_requires_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user(role=UserRole.USER.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    response = client.get(
        "/api/v1/payments/admin",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}


def test_update_payment_status_returns_admin_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    payment = make_payment(status_value=PaymentStatus.PAID)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(
        payment_routes,
        "update_payment_status_for_admin",
        lambda db, payment_id, payload: payment,
    )

    response = client.patch(
        f"/api/v1/payments/{payment.id}/status",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "status": PaymentStatus.PAID.value,
            "external_reference": payment.external_reference,
            "admin_notes": payment.admin_notes,
        },
    )

    assert response.status_code == 200
    assert response.json()["status"] == PaymentStatus.PAID.value
    assert response.json()["external_reference"] == payment.external_reference


def test_update_payment_status_rejects_invalid_payload_before_service_call(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)
    service_called = False

    def fake_update_payment_status_for_admin(db: object, payment_id: UUID, payload: object) -> DummyPayment:
        nonlocal service_called
        service_called = True
        raise AssertionError("Service should not be called for invalid payloads")

    monkeypatch.setattr(
        payment_routes,
        "update_payment_status_for_admin",
        fake_update_payment_status_for_admin,
    )

    response = client.patch(
        f"/api/v1/payments/{uuid4()}/status",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "status": PaymentStatus.FAILED.value,
            "external_reference": "gateway-ref-123",
        },
    )

    assert response.status_code == 422
    assert service_called is False
