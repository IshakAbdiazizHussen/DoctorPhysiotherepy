from __future__ import annotations

from dataclasses import dataclass
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.models.appointment import AppointmentStatus
from app.services import review_service
from app.schemas.review import ReviewCreate


@dataclass
class DummyUser:
    id: UUID


@dataclass
class DummyPatient:
    id: UUID
    user_id: UUID


@dataclass
class DummyReview:
    id: UUID
    patient_id: UUID
    doctor_id: UUID | None
    service_id: UUID | None


def make_user() -> DummyUser:
    return DummyUser(id=uuid4())


def make_patient(*, user_id: UUID) -> DummyPatient:
    return DummyPatient(id=uuid4(), user_id=user_id)


def make_review(*, patient_id: UUID, doctor_id: UUID | None = None, service_id: UUID | None = None) -> DummyReview:
    return DummyReview(
        id=uuid4(),
        patient_id=patient_id,
        doctor_id=doctor_id,
        service_id=service_id,
    )


def test_create_review_record_rejects_missing_patient_record(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    payload = ReviewCreate(doctor_id=uuid4(), rating=5)
    monkeypatch.setattr(review_service, "get_patient_by_user_id", lambda db, user_id: None)

    with pytest.raises(HTTPException) as exc_info:
        review_service.create_review_record(object(), current_user, payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Patient record not found"


def test_create_review_record_rejects_ineligible_patient(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    doctor_id = uuid4()
    payload = ReviewCreate(doctor_id=doctor_id, rating=4)

    monkeypatch.setattr(review_service, "get_patient_by_user_id", lambda db, user_id: patient)
    monkeypatch.setattr(review_service, "get_doctor_by_id", lambda db, target_id: type("Doctor", (), {"is_active": True})())
    monkeypatch.setattr(
        review_service,
        "list_appointments",
        lambda db, **filters: [],
    )

    with pytest.raises(HTTPException) as exc_info:
        review_service.create_review_record(object(), current_user, payload)

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Patient is not eligible to review this target"


def test_create_review_record_rejects_duplicate_review(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    doctor_id = uuid4()
    payload = ReviewCreate(doctor_id=doctor_id, rating=5)

    monkeypatch.setattr(review_service, "get_patient_by_user_id", lambda db, user_id: patient)
    monkeypatch.setattr(review_service, "get_doctor_by_id", lambda db, target_id: type("Doctor", (), {"is_active": True})())
    monkeypatch.setattr(
        review_service,
        "list_appointments",
        lambda db, **filters: [type("Appointment", (), {"status": AppointmentStatus.COMPLETED.value})()],
    )
    monkeypatch.setattr(
        review_service,
        "get_review_by_patient_and_target",
        lambda db, **filters: make_review(patient_id=patient.id, doctor_id=doctor_id),
    )

    with pytest.raises(HTTPException) as exc_info:
        review_service.create_review_record(object(), current_user, payload)

    assert exc_info.value.status_code == 409
    assert exc_info.value.detail == "Review already exists for this target"


def test_get_review_for_public_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(review_service, "get_public_review_by_id", lambda db, review_id: None)

    with pytest.raises(HTTPException) as exc_info:
        review_service.get_review_for_public(object(), uuid4())

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Review not found"


def test_create_review_record_passes_payload_to_repository(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    doctor_id = uuid4()
    payload = ReviewCreate(doctor_id=doctor_id, rating=5, comment="Helpful session.")
    captured_create_args: dict[str, object] = {}

    monkeypatch.setattr(review_service, "get_patient_by_user_id", lambda db, user_id: patient)
    monkeypatch.setattr(review_service, "get_doctor_by_id", lambda db, target_id: type("Doctor", (), {"is_active": True})())
    monkeypatch.setattr(
        review_service,
        "list_appointments",
        lambda db, **filters: [type("Appointment", (), {"status": AppointmentStatus.COMPLETED.value})()],
    )
    monkeypatch.setattr(review_service, "get_review_by_patient_and_target", lambda db, **filters: None)

    def fake_create_review(db: object, **review_data: object) -> DummyReview:
        captured_create_args.update(review_data)
        return make_review(patient_id=patient.id, doctor_id=doctor_id)

    monkeypatch.setattr(review_service, "create_review", fake_create_review)

    created_review = review_service.create_review_record(object(), current_user, payload)

    assert created_review.patient_id == patient.id
    assert captured_create_args["patient_id"] == patient.id
    assert captured_create_args["doctor_id"] == doctor_id
    assert captured_create_args["rating"] == 5
    assert captured_create_args["comment"] == "Helpful session."
