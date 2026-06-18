from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.api import deps as auth_deps
from app.api.v1.routes import doctors as doctor_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import UserRole


@dataclass
class DummyDoctor:
    id: UUID
    full_name: str
    specialty: str
    bio: str | None
    credentials: str | None
    years_of_experience: int | None
    consultation_location: str | None
    availability_summary: str | None
    is_accepting_new_patients: bool
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


def make_doctor(*, is_active: bool = True) -> DummyDoctor:
    timestamp = datetime.now(timezone.utc)
    return DummyDoctor(
        id=uuid4(),
        full_name="Dr. Amina Noor",
        specialty="Physiotherapy",
        bio="Experienced rehabilitation specialist.",
        credentials="DPT",
        years_of_experience=8,
        consultation_location="Main Clinic",
        availability_summary="Weekdays 9am-4pm",
        is_accepting_new_patients=True,
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


def test_list_doctors_returns_public_doctor_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    doctor = make_doctor()
    captured_filters: dict[str, object] = {}

    def fake_get_doctors_for_public(
        db: object,
        *,
        specialty: str | None = None,
        is_accepting_new_patients: bool | None = None,
    ) -> list[DummyDoctor]:
        captured_filters["specialty"] = specialty
        captured_filters["is_accepting_new_patients"] = is_accepting_new_patients
        return [doctor]

    monkeypatch.setattr(doctor_routes, "get_doctors_for_public", fake_get_doctors_for_public)

    response = client.get(
        "/api/v1/doctors",
        params={"specialty": "Physiotherapy", "is_accepting_new_patients": "true"},
    )

    assert response.status_code == 200
    assert captured_filters == {
        "specialty": "Physiotherapy",
        "is_accepting_new_patients": True,
    }
    assert response.json() == [
        {
            "id": str(doctor.id),
            "full_name": doctor.full_name,
            "specialty": doctor.specialty,
            "bio": doctor.bio,
            "credentials": doctor.credentials,
            "years_of_experience": doctor.years_of_experience,
            "consultation_location": doctor.consultation_location,
            "availability_summary": doctor.availability_summary,
            "is_accepting_new_patients": doctor.is_accepting_new_patients,
            "created_at": doctor.created_at.isoformat().replace("+00:00", "Z"),
            "updated_at": doctor.updated_at.isoformat().replace("+00:00", "Z"),
        }
    ]
    assert "is_active" not in response.json()[0]


def test_get_doctor_returns_public_detail(client, monkeypatch: pytest.MonkeyPatch) -> None:
    doctor = make_doctor()
    monkeypatch.setattr(doctor_routes, "get_doctor_for_public", lambda db, doctor_id: doctor)

    response = client.get(f"/api/v1/doctors/{doctor.id}")

    assert response.status_code == 200
    assert response.json()["id"] == str(doctor.id)
    assert response.json()["full_name"] == doctor.full_name
    assert "is_active" not in response.json()


def test_create_doctor_rejects_non_admin_user(
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
        "/api/v1/doctors",
        headers={"Authorization": f"Bearer {user_token}"},
        json={
            "full_name": "Dr. Amina Noor",
            "specialty": "Physiotherapy",
            "bio": "Experienced rehabilitation specialist.",
            "credentials": "DPT",
            "years_of_experience": 8,
            "consultation_location": "Main Clinic",
            "availability_summary": "Weekdays 9am-4pm",
            "is_accepting_new_patients": True,
            "is_active": True,
        },
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}


def test_create_doctor_returns_admin_payload_for_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    doctor = make_doctor()
    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    monkeypatch.setattr(doctor_routes, "create_doctor_record", lambda db, payload: doctor)

    response = client.post(
        "/api/v1/doctors",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "full_name": doctor.full_name,
            "specialty": doctor.specialty,
            "bio": doctor.bio,
            "credentials": doctor.credentials,
            "years_of_experience": doctor.years_of_experience,
            "consultation_location": doctor.consultation_location,
            "availability_summary": doctor.availability_summary,
            "is_accepting_new_patients": doctor.is_accepting_new_patients,
            "is_active": doctor.is_active,
        },
    )

    assert response.status_code == 201
    assert response.json()["id"] == str(doctor.id)
    assert response.json()["is_active"] is True


def test_update_doctor_returns_admin_payload_for_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    doctor = make_doctor(is_active=False)
    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    monkeypatch.setattr(
        doctor_routes,
        "update_doctor_record",
        lambda db, doctor_id, payload: doctor,
    )

    response = client.put(
        f"/api/v1/doctors/{doctor.id}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"is_active": False, "availability_summary": doctor.availability_summary},
    )

    assert response.status_code == 200
    assert response.json()["id"] == str(doctor.id)
    assert response.json()["is_active"] is False


def test_delete_doctor_rejects_missing_token(client) -> None:
    response = client.delete(f"/api/v1/doctors/{uuid4()}")

    assert response.status_code == 401
    assert response.json() == {"detail": "Missing bearer token"}


def test_update_doctor_returns_not_found_error_for_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    app.dependency_overrides[get_db] = lambda: object()
    admin_token = authorize_request_as(
        make_user(role=UserRole.ADMIN.value),
        monkeypatch,
    )

    def fake_update_doctor_record(db: object, doctor_id: UUID, payload: object) -> DummyDoctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )

    monkeypatch.setattr(doctor_routes, "update_doctor_record", fake_update_doctor_record)

    response = client.put(
        f"/api/v1/doctors/{uuid4()}",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"specialty": "Sports Rehabilitation"},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Doctor not found"}
