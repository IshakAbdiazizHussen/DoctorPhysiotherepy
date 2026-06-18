from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.models.user import UserRole
from app.schemas.patient import PatientAdminUpdate, PatientCreate, PatientSelfUpdate
from app.services import patient_service


@dataclass
class DummyUser:
    id: UUID
    role: str


@dataclass
class DummyPatient:
    id: UUID
    user_id: UUID


def make_user(*, role: str = UserRole.USER.value) -> DummyUser:
    return DummyUser(id=uuid4(), role=role)


def make_patient(*, user_id: UUID) -> DummyPatient:
    return DummyPatient(id=uuid4(), user_id=user_id)


def test_create_patient_record_rejects_missing_linked_user(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = PatientCreate(user_id=uuid4())
    monkeypatch.setattr(patient_service, "get_user_by_id", lambda db, user_id: None)

    with pytest.raises(HTTPException) as exc_info:
        patient_service.create_patient_record(object(), payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Linked user not found"


def test_create_patient_record_rejects_duplicate_user_link(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    user_id = uuid4()
    payload = PatientCreate(user_id=user_id)
    monkeypatch.setattr(patient_service, "get_user_by_id", lambda db, lookup_user_id: object())
    monkeypatch.setattr(
        patient_service,
        "get_patient_by_user_id",
        lambda db, lookup_user_id: make_patient(user_id=user_id),
    )

    with pytest.raises(HTTPException) as exc_info:
        patient_service.create_patient_record(object(), payload)

    assert exc_info.value.status_code == 409
    assert exc_info.value.detail == "Patient record already exists for this user"


def test_get_patient_record_for_owner_or_admin_rejects_other_user(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    owner = make_user()
    other_user = make_user()
    patient = make_patient(user_id=owner.id)
    monkeypatch.setattr(patient_service, "get_patient_by_id", lambda db, patient_id: patient)

    with pytest.raises(HTTPException) as exc_info:
        patient_service.get_patient_record_for_owner_or_admin(
            object(),
            patient.id,
            other_user,
        )

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Patient access is not allowed"


def test_get_patient_record_for_owner_or_admin_allows_admin(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    owner = make_user()
    admin_user = make_user(role=UserRole.ADMIN.value)
    patient = make_patient(user_id=owner.id)
    monkeypatch.setattr(patient_service, "get_patient_by_id", lambda db, patient_id: patient)

    result = patient_service.get_patient_record_for_owner_or_admin(
        object(),
        patient.id,
        admin_user,
    )

    assert result is patient


def test_update_patient_record_for_current_user_updates_own_record(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    payload = PatientSelfUpdate(phone_number="555-0110")
    captured_update_data: dict[str, object] = {}

    monkeypatch.setattr(
        patient_service,
        "get_patient_record_for_current_user",
        lambda db, current_user: patient,
    )

    def fake_update_patient(db: object, patient_obj: DummyPatient, **update_data: object) -> DummyPatient:
        captured_update_data.update(update_data)
        return patient_obj

    monkeypatch.setattr(patient_service, "update_patient", fake_update_patient)

    updated_patient = patient_service.update_patient_record_for_current_user(
        object(),
        current_user,
        payload,
    )

    assert updated_patient is patient
    assert captured_update_data == {"phone_number": "555-0110"}


def test_update_patient_record_for_admin_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = PatientAdminUpdate(admin_notes="Updated")
    monkeypatch.setattr(patient_service, "get_patient_by_id", lambda db, patient_id: None)

    with pytest.raises(HTTPException) as exc_info:
        patient_service.update_patient_record_for_admin(object(), uuid4(), payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Patient not found"
