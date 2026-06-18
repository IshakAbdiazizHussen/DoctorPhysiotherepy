from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.models.appointment import AppointmentStatus
from app.models.user import UserRole
from app.schemas.appointment import AppointmentCreate, AppointmentStatusUpdate
from app.services import appointment_service


@dataclass
class DummyUser:
    id: UUID
    role: str


@dataclass
class DummyPatient:
    id: UUID
    user_id: UUID
    is_active: bool = True


@dataclass
class DummyDoctor:
    id: UUID
    is_active: bool = True
    is_accepting_new_patients: bool = True


@dataclass
class DummyService:
    id: UUID
    is_active: bool = True


@dataclass
class DummyAppointment:
    id: UUID
    patient_id: UUID
    status: str
    admin_notes: str | None = None


def make_user(*, role: str = UserRole.USER.value) -> DummyUser:
    return DummyUser(id=uuid4(), role=role)


def make_patient(*, user_id: UUID, is_active: bool = True) -> DummyPatient:
    return DummyPatient(id=uuid4(), user_id=user_id, is_active=is_active)


def make_doctor(*, is_active: bool = True, is_accepting_new_patients: bool = True) -> DummyDoctor:
    return DummyDoctor(
        id=uuid4(),
        is_active=is_active,
        is_accepting_new_patients=is_accepting_new_patients,
    )


def make_service(*, is_active: bool = True) -> DummyService:
    return DummyService(id=uuid4(), is_active=is_active)


def make_appointment(*, patient_id: UUID, status: AppointmentStatus) -> DummyAppointment:
    return DummyAppointment(id=uuid4(), patient_id=patient_id, status=status.value)


def test_create_appointment_record_rejects_missing_linked_patient(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    payload = AppointmentCreate(
        patient_id=uuid4(),
        doctor_id=uuid4(),
        service_id=uuid4(),
        scheduled_at=datetime.now(timezone.utc) + timedelta(days=1),
    )
    monkeypatch.setattr(appointment_service, "get_patient_by_id", lambda db, patient_id: None)

    with pytest.raises(HTTPException) as exc_info:
        appointment_service.create_appointment_record(object(), current_user, payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Linked patient not found"


def test_create_appointment_record_rejects_other_users_patient(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    other_patient = make_patient(user_id=uuid4())
    current_patient = make_patient(user_id=current_user.id)
    doctor = make_doctor()
    service = make_service()
    payload = AppointmentCreate(
        patient_id=other_patient.id,
        doctor_id=doctor.id,
        service_id=service.id,
        scheduled_at=datetime.now(timezone.utc) + timedelta(days=1),
    )

    monkeypatch.setattr(appointment_service, "get_patient_by_id", lambda db, patient_id: other_patient)
    monkeypatch.setattr(appointment_service, "get_doctor_by_id", lambda db, doctor_id: doctor)
    monkeypatch.setattr(appointment_service, "get_service_by_id", lambda db, service_id: service)
    monkeypatch.setattr(
        appointment_service,
        "get_patient_by_user_id",
        lambda db, user_id: current_patient,
    )

    with pytest.raises(HTTPException) as exc_info:
        appointment_service.create_appointment_record(object(), current_user, payload)

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Appointment access is not allowed"


def test_get_appointment_for_owner_or_admin_rejects_other_user(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    owner = make_user()
    other_user = make_user()
    patient = make_patient(user_id=owner.id)
    appointment = make_appointment(
        patient_id=patient.id,
        status=AppointmentStatus.PENDING,
    )

    monkeypatch.setattr(
        appointment_service,
        "get_appointment_by_id",
        lambda db, appointment_id: appointment,
    )
    monkeypatch.setattr(
        appointment_service,
        "get_patient_by_user_id",
        lambda db, user_id: make_patient(user_id=other_user.id),
    )

    with pytest.raises(HTTPException) as exc_info:
        appointment_service.get_appointment_for_owner_or_admin(
            object(),
            appointment.id,
            other_user,
        )

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Appointment access is not allowed"


def test_update_appointment_status_rejects_invalid_transition(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user(role=UserRole.ADMIN.value)
    patient = make_patient(user_id=uuid4())
    appointment = make_appointment(
        patient_id=patient.id,
        status=AppointmentStatus.COMPLETED,
    )
    payload = AppointmentStatusUpdate(status=AppointmentStatus.CONFIRMED)

    monkeypatch.setattr(
        appointment_service,
        "get_appointment_by_id",
        lambda db, appointment_id: appointment,
    )

    with pytest.raises(HTTPException) as exc_info:
        appointment_service.update_appointment_status_for_current_user(
            object(),
            appointment.id,
            current_user,
            payload,
        )

    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid appointment status transition"


def test_update_appointment_status_allows_owner_cancellation(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    appointment = make_appointment(
        patient_id=patient.id,
        status=AppointmentStatus.PENDING,
    )
    payload = AppointmentStatusUpdate(status=AppointmentStatus.CANCELLED)
    captured_update_data: dict[str, object] = {}

    monkeypatch.setattr(
        appointment_service,
        "get_appointment_by_id",
        lambda db, appointment_id: appointment,
    )
    monkeypatch.setattr(
        appointment_service,
        "get_patient_by_user_id",
        lambda db, user_id: patient,
    )

    def fake_update_appointment(
        db: object,
        appointment_obj: DummyAppointment,
        **update_data: object,
    ) -> DummyAppointment:
        captured_update_data.update(update_data)
        appointment_obj.status = str(update_data["status"])
        return appointment_obj

    monkeypatch.setattr(appointment_service, "update_appointment", fake_update_appointment)

    updated_appointment = appointment_service.update_appointment_status_for_current_user(
        object(),
        appointment.id,
        current_user,
        payload,
    )

    assert updated_appointment.status == AppointmentStatus.CANCELLED.value
    assert captured_update_data == {"status": AppointmentStatus.CANCELLED.value}


def test_update_appointment_status_rejects_patient_confirmation(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    patient = make_patient(user_id=current_user.id)
    appointment = make_appointment(
        patient_id=patient.id,
        status=AppointmentStatus.PENDING,
    )
    payload = AppointmentStatusUpdate(status=AppointmentStatus.CONFIRMED)

    monkeypatch.setattr(
        appointment_service,
        "get_appointment_by_id",
        lambda db, appointment_id: appointment,
    )
    monkeypatch.setattr(
        appointment_service,
        "get_patient_by_user_id",
        lambda db, user_id: patient,
    )

    with pytest.raises(HTTPException) as exc_info:
        appointment_service.update_appointment_status_for_current_user(
            object(),
            appointment.id,
            current_user,
            payload,
        )

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Patients can only cancel their own appointments"
