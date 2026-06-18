from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.api import deps as auth_deps
from app.api.v1.routes import appointments as appointment_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.appointment import AppointmentStatus
from app.models.user import UserRole


@dataclass
class DummyAppointment:
    id: UUID
    patient_id: UUID
    doctor_id: UUID
    service_id: UUID
    scheduled_at: datetime
    status: str
    notes: str | None
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
        full_name="Appointment User",
        email=f"{role}-{uuid4().hex[:8]}@example.com",
        role=role,
        is_active=True,
        is_verified=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def make_appointment(*, patient_id: UUID, status_value: AppointmentStatus) -> DummyAppointment:
    timestamp = datetime.now(timezone.utc)
    return DummyAppointment(
        id=uuid4(),
        patient_id=patient_id,
        doctor_id=uuid4(),
        service_id=uuid4(),
        scheduled_at=timestamp + timedelta(days=1),
        status=status_value.value,
        notes="Initial appointment request.",
        admin_notes="Internal review note.",
        created_at=timestamp,
        updated_at=timestamp,
    )


def authorize_request_as(user: DummyUser, monkeypatch: pytest.MonkeyPatch) -> str:
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: user)
    return create_access_token(str(user.id))


def test_create_appointment_returns_owner_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    appointment = make_appointment(
        patient_id=uuid4(),
        status_value=AppointmentStatus.PENDING,
    )
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    monkeypatch.setattr(
        appointment_routes,
        "create_appointment_record",
        lambda db, current_user, payload: appointment,
    )

    response = client.post(
        "/api/v1/appointments",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "patient_id": str(appointment.patient_id),
            "doctor_id": str(appointment.doctor_id),
            "service_id": str(appointment.service_id),
            "scheduled_at": appointment.scheduled_at.isoformat().replace("+00:00", "Z"),
            "notes": appointment.notes,
        },
    )

    assert response.status_code == 201
    assert response.json()["patient_id"] == str(appointment.patient_id)
    assert response.json()["status"] == AppointmentStatus.PENDING.value
    assert "admin_notes" not in response.json()


def test_create_appointment_rejects_past_datetime_before_service_call(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)
    service_called = False

    def fake_create_appointment_record(db: object, current_user: DummyUser, payload: object) -> DummyAppointment:
        nonlocal service_called
        service_called = True
        raise AssertionError("Service should not be called for invalid payloads")

    monkeypatch.setattr(
        appointment_routes,
        "create_appointment_record",
        fake_create_appointment_record,
    )

    response = client.post(
        "/api/v1/appointments",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "patient_id": str(uuid4()),
            "doctor_id": str(uuid4()),
            "service_id": str(uuid4()),
            "scheduled_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat().replace("+00:00", "Z"),
        },
    )

    assert response.status_code == 422
    assert service_called is False


def test_list_appointments_returns_owner_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    appointment = make_appointment(
        patient_id=uuid4(),
        status_value=AppointmentStatus.PENDING,
    )
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)
    captured_filters: dict[str, object] = {}

    def fake_list_appointments_for_current_user(
        db: object,
        current_user: DummyUser,
        *,
        patient_id: UUID | None = None,
        doctor_id: UUID | None = None,
        service_id: UUID | None = None,
        status_filter: AppointmentStatus | None = None,
        scheduled_from: datetime | None = None,
        scheduled_to: datetime | None = None,
    ) -> list[DummyAppointment]:
        captured_filters["doctor_id"] = doctor_id
        captured_filters["status_filter"] = status_filter
        return [appointment]

    monkeypatch.setattr(
        appointment_routes,
        "list_appointments_for_current_user",
        fake_list_appointments_for_current_user,
    )

    response = client.get(
        "/api/v1/appointments",
        headers={"Authorization": f"Bearer {token}"},
        params={
            "doctor_id": str(appointment.doctor_id),
            "status": AppointmentStatus.PENDING.value,
        },
    )

    assert response.status_code == 200
    assert captured_filters["doctor_id"] == appointment.doctor_id
    assert captured_filters["status_filter"] == AppointmentStatus.PENDING
    assert response.json()[0]["id"] == str(appointment.id)
    assert "admin_notes" not in response.json()[0]


def test_get_appointment_rejects_different_user(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    def fake_get_appointment_for_owner_or_admin(
        db: object,
        appointment_id: UUID,
        current_user: DummyUser,
    ) -> DummyAppointment:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Appointment access is not allowed",
        )

    monkeypatch.setattr(
        appointment_routes,
        "get_appointment_for_owner_or_admin",
        fake_get_appointment_for_owner_or_admin,
    )

    response = client.get(
        f"/api/v1/appointments/{uuid4()}",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Appointment access is not allowed"}


def test_admin_list_appointments_returns_admin_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    appointment = make_appointment(
        patient_id=uuid4(),
        status_value=AppointmentStatus.CONFIRMED,
    )
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(
        appointment_routes,
        "list_appointments_for_admin",
        lambda db, **filters: [appointment],
    )

    response = client.get(
        "/api/v1/appointments/admin",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    assert response.json()[0]["id"] == str(appointment.id)
    assert response.json()[0]["admin_notes"] == appointment.admin_notes


def test_admin_list_appointments_requires_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user(role=UserRole.USER.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    response = client.get(
        "/api/v1/appointments/admin",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}


def test_update_appointment_status_returns_owner_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    appointment = make_appointment(
        patient_id=uuid4(),
        status_value=AppointmentStatus.CANCELLED,
    )
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    monkeypatch.setattr(
        appointment_routes,
        "update_appointment_status_for_current_user",
        lambda db, appointment_id, current_user, payload: appointment,
    )

    response = client.patch(
        f"/api/v1/appointments/{appointment.id}/status",
        headers={"Authorization": f"Bearer {token}"},
        json={"status": AppointmentStatus.CANCELLED.value},
    )

    assert response.status_code == 200
    assert response.json()["status"] == AppointmentStatus.CANCELLED.value
    assert "admin_notes" not in response.json()


def test_update_appointment_status_returns_not_found_error(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user(role=UserRole.ADMIN.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    def fake_update_appointment_status(
        db: object,
        appointment_id: UUID,
        current_user: DummyUser,
        payload: object,
    ) -> DummyAppointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )

    monkeypatch.setattr(
        appointment_routes,
        "update_appointment_status_for_current_user",
        fake_update_appointment_status,
    )

    response = client.patch(
        f"/api/v1/appointments/{uuid4()}/status",
        headers={"Authorization": f"Bearer {token}"},
        json={"status": AppointmentStatus.CONFIRMED.value},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Appointment not found"}
