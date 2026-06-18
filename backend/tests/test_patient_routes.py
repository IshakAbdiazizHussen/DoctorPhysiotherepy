from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.api import deps as auth_deps
from app.api.v1.routes import patients as patient_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import UserRole


@dataclass
class DummyPatient:
    id: UUID
    user_id: UUID
    date_of_birth: date | None
    phone_number: str | None
    address: str | None
    emergency_contact_name: str | None
    emergency_contact_phone: str | None
    admin_notes: str | None
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


def make_user(*, role: str = UserRole.USER.value) -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="Patient User",
        email=f"{role}-{uuid4().hex[:8]}@example.com",
        role=role,
        is_active=True,
        is_verified=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def make_patient(*, user_id: UUID) -> DummyPatient:
    timestamp = datetime.now(timezone.utc)
    return DummyPatient(
        id=uuid4(),
        user_id=user_id,
        date_of_birth=date(1990, 5, 17),
        phone_number="555-0100",
        address="Therapy Street 12",
        emergency_contact_name="Asha Noor",
        emergency_contact_phone="555-0101",
        admin_notes="Internal follow-up note.",
        is_active=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def authorize_request_as(user: DummyUser, monkeypatch: pytest.MonkeyPatch) -> str:
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: user)
    return create_access_token(str(user.id))


def test_get_current_patient_record_returns_owner_view(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    monkeypatch.setattr(
        patient_routes,
        "get_patient_record_for_current_user",
        lambda db, current_user: patient,
    )

    response = client.get(
        "/api/v1/patients/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    assert response.json()["user_id"] == str(current_user.id)
    assert "admin_notes" not in response.json()
    assert "is_active" not in response.json()


def test_get_patient_record_rejects_different_user(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    def fake_get_patient_record_for_owner_or_admin(
        db: object,
        patient_id: UUID,
        current_user: DummyUser,
    ) -> DummyPatient:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Patient access is not allowed",
        )

    monkeypatch.setattr(
        patient_routes,
        "get_patient_record_for_owner_or_admin",
        fake_get_patient_record_for_owner_or_admin,
    )

    response = client.get(
        f"/api/v1/patients/{uuid4()}",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Patient access is not allowed"}


def test_list_patients_requires_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user(role=UserRole.USER.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    response = client.get(
        "/api/v1/patients",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}


def test_list_patients_returns_admin_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    patient = make_patient(user_id=uuid4())
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(patient_routes, "list_patient_records_for_admin", lambda db: [patient])

    response = client.get(
        "/api/v1/patients",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    assert response.json()[0]["id"] == str(patient.id)
    assert response.json()[0]["admin_notes"] == patient.admin_notes
    assert response.json()[0]["is_active"] is True


def test_create_patient_returns_admin_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    patient = make_patient(user_id=uuid4())
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(patient_routes, "create_patient_record", lambda db, payload: patient)

    response = client.post(
        "/api/v1/patients",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "user_id": str(patient.user_id),
            "date_of_birth": "1990-05-17",
            "phone_number": patient.phone_number,
            "address": patient.address,
            "emergency_contact_name": patient.emergency_contact_name,
            "emergency_contact_phone": patient.emergency_contact_phone,
            "admin_notes": patient.admin_notes,
            "is_active": patient.is_active,
        },
    )

    assert response.status_code == 201
    assert response.json()["user_id"] == str(patient.user_id)
    assert response.json()["admin_notes"] == patient.admin_notes


def test_update_current_patient_record_returns_owner_view(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    monkeypatch.setattr(
        patient_routes,
        "update_patient_record_for_current_user",
        lambda db, current_user, payload: patient,
    )

    response = client.put(
        "/api/v1/patients/me",
        headers={"Authorization": f"Bearer {token}"},
        json={"phone_number": patient.phone_number},
    )

    assert response.status_code == 200
    assert response.json()["phone_number"] == patient.phone_number
    assert "admin_notes" not in response.json()


def test_admin_update_patient_returns_admin_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    patient = make_patient(user_id=uuid4())
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(
        patient_routes,
        "update_patient_record_for_admin",
        lambda db, patient_id, payload: patient,
    )

    response = client.put(
        f"/api/v1/patients/{patient.id}",
        headers={"Authorization": f"Bearer {token}"},
        json={"admin_notes": patient.admin_notes, "is_active": patient.is_active},
    )

    assert response.status_code == 200
    assert response.json()["admin_notes"] == patient.admin_notes
    assert response.json()["is_active"] is True
