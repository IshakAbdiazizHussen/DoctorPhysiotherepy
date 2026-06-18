from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.models.appointment import AppointmentStatus
from app.models.payment import PaymentMethod, PaymentStatus
from app.models.user import UserRole
from app.schemas.payment import PaymentCreate, PaymentStatusUpdate
from app.services import payment_service


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
class DummyService:
    id: UUID
    is_active: bool = True


@dataclass
class DummyAppointment:
    id: UUID
    patient_id: UUID
    service_id: UUID
    status: str


@dataclass
class DummyPayment:
    id: UUID
    patient_id: UUID
    status: str
    external_reference: str | None = None


def make_user(*, role: str = UserRole.USER.value) -> DummyUser:
    return DummyUser(id=uuid4(), role=role)


def make_patient(*, user_id: UUID, is_active: bool = True) -> DummyPatient:
    return DummyPatient(id=uuid4(), user_id=user_id, is_active=is_active)


def make_service(*, is_active: bool = True) -> DummyService:
    return DummyService(id=uuid4(), is_active=is_active)


def make_appointment(*, patient_id: UUID, service_id: UUID, status: str) -> DummyAppointment:
    return DummyAppointment(
        id=uuid4(),
        patient_id=patient_id,
        service_id=service_id,
        status=status,
    )


def make_payment(*, patient_id: UUID, status: PaymentStatus) -> DummyPayment:
    return DummyPayment(id=uuid4(), patient_id=patient_id, status=status.value)


def test_create_payment_record_rejects_missing_linked_patient(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user()
    payload = PaymentCreate(
        patient_id=uuid4(),
        service_id=uuid4(),
        amount=Decimal("50.00"),
        method=PaymentMethod.CASH,
    )
    monkeypatch.setattr(payment_service, "get_patient_by_id", lambda db, patient_id: None)

    with pytest.raises(HTTPException) as exc_info:
        payment_service.create_payment_record(object(), current_user, payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Linked patient not found"


def test_create_payment_record_rejects_mismatched_appointment_service(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    current_user = make_user(role=UserRole.ADMIN.value)
    patient = make_patient(user_id=uuid4())
    service = make_service()
    other_service = make_service()
    appointment = make_appointment(
        patient_id=patient.id,
        service_id=other_service.id,
        status=AppointmentStatus.PENDING.value,
    )
    payload = PaymentCreate(
        patient_id=patient.id,
        appointment_id=appointment.id,
        service_id=service.id,
        amount=Decimal("50.00"),
        method=PaymentMethod.CARD,
    )

    monkeypatch.setattr(payment_service, "get_patient_by_id", lambda db, patient_id: patient)
    monkeypatch.setattr(payment_service, "get_service_by_id", lambda db, service_id: service)
    monkeypatch.setattr(payment_service, "get_appointment_by_id", lambda db, appointment_id: appointment)

    with pytest.raises(HTTPException) as exc_info:
        payment_service.create_payment_record(object(), current_user, payload)

    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Linked appointment does not match the provided service"


def test_get_payment_for_owner_or_admin_rejects_other_user(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    owner = make_user()
    other_user = make_user()
    patient = make_patient(user_id=owner.id)
    other_patient = make_patient(user_id=other_user.id)
    payment = make_payment(patient_id=patient.id, status=PaymentStatus.PENDING)

    monkeypatch.setattr(payment_service, "get_payment_by_id", lambda db, payment_id: payment)
    monkeypatch.setattr(payment_service, "get_patient_by_user_id", lambda db, user_id: other_patient)

    with pytest.raises(HTTPException) as exc_info:
        payment_service.get_payment_for_owner_or_admin(object(), payment.id, other_user)

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Payment access is not allowed"


def test_update_payment_status_for_admin_rejects_invalid_transition(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payment = make_payment(patient_id=uuid4(), status=PaymentStatus.REFUNDED)
    payload = PaymentStatusUpdate(status=PaymentStatus.PAID)

    monkeypatch.setattr(payment_service, "get_payment_by_id", lambda db, payment_id: payment)

    with pytest.raises(HTTPException) as exc_info:
        payment_service.update_payment_status_for_admin(object(), payment.id, payload)

    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid payment status transition"


def test_update_payment_status_for_admin_updates_reference_and_status(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payment = make_payment(patient_id=uuid4(), status=PaymentStatus.PENDING)
    payload = PaymentStatusUpdate(
        status=PaymentStatus.PAID,
        external_reference="gateway-ref-123",
        admin_notes="Paid in clinic.",
    )
    captured_update_data: dict[str, object] = {}

    monkeypatch.setattr(payment_service, "get_payment_by_id", lambda db, payment_id: payment)

    def fake_update_payment(db: object, payment_obj: DummyPayment, **update_data: object) -> DummyPayment:
        captured_update_data.update(update_data)
        payment_obj.status = str(update_data["status"])
        payment_obj.external_reference = update_data.get("external_reference")  # type: ignore[assignment]
        return payment_obj

    monkeypatch.setattr(payment_service, "update_payment", fake_update_payment)

    updated_payment = payment_service.update_payment_status_for_admin(object(), payment.id, payload)

    assert updated_payment.status == PaymentStatus.PAID.value
    assert captured_update_data == {
        "status": PaymentStatus.PAID.value,
        "external_reference": "gateway-ref-123",
        "admin_notes": "Paid in clinic.",
    }
