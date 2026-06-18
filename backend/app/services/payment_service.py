from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.appointment import Appointment, AppointmentStatus
from app.models.patient import Patient
from app.models.payment import Payment, PaymentMethod, PaymentStatus
from app.models.service import Service
from app.models.user import User, UserRole
from app.repositories.appointment_repository import get_appointment_by_id
from app.repositories.patient_repository import get_patient_by_id, get_patient_by_user_id
from app.repositories.payment_repository import (
    create_payment,
    get_payment_by_id,
    list_payments,
    update_payment,
)
from app.repositories.service_repository import get_service_by_id
from app.schemas.payment import PaymentCreate, PaymentStatusUpdate

STATUS_TRANSITIONS: dict[PaymentStatus, set[PaymentStatus]] = {
    PaymentStatus.PENDING: {
        PaymentStatus.PAID,
        PaymentStatus.FAILED,
        PaymentStatus.CANCELLED,
    },
    PaymentStatus.FAILED: {
        PaymentStatus.PENDING,
        PaymentStatus.CANCELLED,
    },
    PaymentStatus.PAID: {
        PaymentStatus.REFUNDED,
    },
    PaymentStatus.CANCELLED: set(),
    PaymentStatus.REFUNDED: set(),
}


def _get_payment_or_404(db: Session, payment_id: UUID) -> Payment:
    payment = get_payment_by_id(db, payment_id)
    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )
    return payment


def _get_current_user_patient_or_404(db: Session, current_user: User) -> Patient:
    patient = get_patient_by_user_id(db, current_user.id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient record not found",
        )
    return patient


def _ensure_owner_or_admin(payment: Payment, current_user: User, patient: Patient | None) -> Payment:
    if current_user.role == UserRole.ADMIN.value:
        return payment

    if patient is not None and payment.patient_id == patient.id:
        return payment

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Payment access is not allowed",
    )


def _get_linked_patient_or_404(db: Session, patient_id: UUID) -> Patient:
    patient = get_patient_by_id(db, patient_id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Linked patient not found",
        )
    if not patient.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Linked patient is inactive",
        )
    return patient


def _get_linked_service_or_404(db: Session, service_id: UUID) -> Service:
    service = get_service_by_id(db, service_id)
    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Linked service not found",
        )
    if not service.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Linked service is inactive",
        )
    return service


def _get_linked_appointment_or_404(db: Session, appointment_id: UUID) -> Appointment:
    appointment = get_appointment_by_id(db, appointment_id)
    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Linked appointment not found",
        )
    if appointment.status == AppointmentStatus.CANCELLED.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Linked appointment is cancelled",
        )
    return appointment


def list_payments_for_current_user(
    db: Session,
    current_user: User,
    *,
    patient_id: UUID | None = None,
    appointment_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: PaymentStatus | None = None,
    method_filter: PaymentMethod | None = None,
) -> list[Payment]:
    if current_user.role == UserRole.ADMIN.value:
        return list_payments(
            db,
            patient_id=patient_id,
            appointment_id=appointment_id,
            service_id=service_id,
            status=status_filter,
            method=method_filter,
        )

    patient = _get_current_user_patient_or_404(db, current_user)
    if patient_id is not None and patient_id != patient.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Payment access is not allowed",
        )

    return list_payments(
        db,
        patient_id=patient.id,
        appointment_id=appointment_id,
        service_id=service_id,
        status=status_filter,
        method=method_filter,
    )


def list_payments_for_admin(
    db: Session,
    *,
    patient_id: UUID | None = None,
    appointment_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: PaymentStatus | None = None,
    method_filter: PaymentMethod | None = None,
) -> list[Payment]:
    return list_payments(
        db,
        patient_id=patient_id,
        appointment_id=appointment_id,
        service_id=service_id,
        status=status_filter,
        method=method_filter,
    )


def get_payment_for_owner_or_admin(
    db: Session,
    payment_id: UUID,
    current_user: User,
) -> Payment:
    payment = _get_payment_or_404(db, payment_id)
    patient = None
    if current_user.role != UserRole.ADMIN.value:
        patient = _get_current_user_patient_or_404(db, current_user)
    return _ensure_owner_or_admin(payment, current_user, patient)


def create_payment_record(
    db: Session,
    current_user: User,
    payload: PaymentCreate,
) -> Payment:
    linked_patient = _get_linked_patient_or_404(db, payload.patient_id)
    _get_linked_service_or_404(db, payload.service_id)

    if current_user.role != UserRole.ADMIN.value:
        current_patient = _get_current_user_patient_or_404(db, current_user)
        if linked_patient.id != current_patient.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Payment access is not allowed",
            )

    if payload.appointment_id is not None:
        appointment = _get_linked_appointment_or_404(db, payload.appointment_id)
        if appointment.patient_id != linked_patient.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Linked appointment does not belong to the provided patient",
            )
        if appointment.service_id != payload.service_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Linked appointment does not match the provided service",
            )

    return create_payment(
        db,
        **payload.model_dump(),
        status=PaymentStatus.PENDING.value,
    )


def update_payment_status_for_admin(
    db: Session,
    payment_id: UUID,
    payload: PaymentStatusUpdate,
) -> Payment:
    payment = _get_payment_or_404(db, payment_id)
    current_status = PaymentStatus(payment.status)
    requested_status = payload.status

    if requested_status not in STATUS_TRANSITIONS[current_status]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid payment status transition",
        )

    update_data: dict[str, object] = {"status": requested_status.value}

    if payload.external_reference is not None:
        update_data["external_reference"] = payload.external_reference

    if payload.admin_notes is not None:
        update_data["admin_notes"] = payload.admin_notes

    return update_payment(db, payment, **update_data)
