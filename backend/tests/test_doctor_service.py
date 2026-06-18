from __future__ import annotations

from dataclasses import dataclass
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.services import doctor_service
from app.schemas.doctor import DoctorCreate, DoctorUpdate


@dataclass
class DummyDoctor:
    id: UUID
    specialty: str
    is_active: bool


def make_doctor() -> DummyDoctor:
    return DummyDoctor(
        id=uuid4(),
        specialty="Physiotherapy",
        is_active=True,
    )


def test_get_doctor_for_public_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(doctor_service, "get_public_doctor_by_id", lambda db, doctor_id: None)

    with pytest.raises(HTTPException) as exc_info:
        doctor_service.get_doctor_for_public(object(), uuid4())

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Doctor not found"


def test_create_doctor_record_passes_schema_data_to_repository(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = DoctorCreate(
        full_name="Dr. Amina Noor",
        specialty="Physiotherapy",
        bio="Experienced rehabilitation specialist.",
        credentials="DPT",
        years_of_experience=8,
        consultation_location="Main Clinic",
        availability_summary="Weekdays 9am-4pm",
        is_accepting_new_patients=True,
        is_active=True,
    )
    captured_create_args: dict[str, object] = {}

    def fake_create_doctor(db: object, **doctor_data: object) -> DummyDoctor:
        captured_create_args.update(doctor_data)
        return make_doctor()

    monkeypatch.setattr(doctor_service, "create_doctor", fake_create_doctor)

    created_doctor = doctor_service.create_doctor_record(object(), payload)

    assert created_doctor.specialty == "Physiotherapy"
    assert captured_create_args["full_name"] == payload.full_name
    assert captured_create_args["specialty"] == payload.specialty
    assert captured_create_args["is_active"] is True


def test_update_doctor_record_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = DoctorUpdate(specialty="Sports Rehabilitation")
    monkeypatch.setattr(doctor_service, "get_doctor_by_id", lambda db, doctor_id: None)

    with pytest.raises(HTTPException) as exc_info:
        doctor_service.update_doctor_record(object(), uuid4(), payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Doctor not found"


def test_delete_doctor_record_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(doctor_service, "get_doctor_by_id", lambda db, doctor_id: None)

    with pytest.raises(HTTPException) as exc_info:
        doctor_service.delete_doctor_record(object(), uuid4())

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Doctor not found"
