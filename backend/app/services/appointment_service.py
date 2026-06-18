from __future__ import annotations

from datetime import datetime
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.appointment import Appointment, AppointmentStatus
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.service import Service
from app.models.user import User, UserRole
from app.repositories.appointment_repository import (
    create_appointment,
    get_appointment_by_id,
    list_appointments,
    update_appointment,
)
from app.repositories.doctor_repository import get_doctor_by_id
from app.repositories.patient_repository import get_patient_by_id, get_patient_by_user_id
from app.repositories.service_repository import get_service_by_id
from app.schemas.appointment import AppointmentCreate, AppointmentStatusUpdate

STATUS_TRANSITIONS: dict[AppointmentStatus, set[AppointmentStatus]] = {
    AppointmentStatus.PENDING: {
        AppointmentStatus.CONFIRMED,
        AppointmentStatus.CANCELLED,
    },
    AppointmentStatus.CONFIRMED: {
        AppointmentStatus.COMPLETED,
        AppointmentStatus.CANCELLED,
    },
    AppointmentStatus.COMPLETED: set(),
    AppointmentStatus.CANCELLED: set(),
}


def _get_appointment_or_404(db: Session, appointment_id: UUID) -> Appointment:
    appointment = get_appointment_by_id(db, appointment_id)
    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )
    return appointment


def _get_current_user_patient_or_404(db: Session, current_user: User) -> Patient:
    patient = get_patient_by_user_id(db, current_user.id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient record not found",
        )
    return patient


def _ensure_owner_or_admin(appointment: Appointment, current_user: User, patient: Patient | None) -> Appointment:
    if current_user.role == UserRole.ADMIN.value:
        return appointment

    if patient is not None and appointment.patient_id == patient.id:
        return appointment

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Appointment access is not allowed",
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


def _get_linked_doctor_or_404(db: Session, doctor_id: UUID) -> Doctor:
    doctor = get_doctor_by_id(db, doctor_id)
    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Linked doctor not found",
        )
    if not doctor.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Linked doctor is inactive",
        )
    if not doctor.is_accepting_new_patients:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Doctor is not accepting new patients",
        )
    return doctor


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


def list_appointments_for_current_user(
    db: Session,
    current_user: User,
    *,
    patient_id: UUID | None = None,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: AppointmentStatus | None = None,
    scheduled_from: datetime | None = None,
    scheduled_to: datetime | None = None,
) -> list[Appointment]:
    if current_user.role == UserRole.ADMIN.value:
        return list_appointments(
            db,
            patient_id=patient_id,
            doctor_id=doctor_id,
            service_id=service_id,
            status=status_filter,
            scheduled_from=scheduled_from,
            scheduled_to=scheduled_to,
        )

    patient = _get_current_user_patient_or_404(db, current_user)
    if patient_id is not None and patient_id != patient.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Appointment access is not allowed",
        )

    return list_appointments(
        db,
        patient_id=patient.id,
        doctor_id=doctor_id,
        service_id=service_id,
        status=status_filter,
        scheduled_from=scheduled_from,
        scheduled_to=scheduled_to,
    )


def list_appointments_for_admin(
    db: Session,
    *,
    patient_id: UUID | None = None,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: AppointmentStatus | None = None,
    scheduled_from: datetime | None = None,
    scheduled_to: datetime | None = None,
) -> list[Appointment]:
    return list_appointments(
        db,
        patient_id=patient_id,
        doctor_id=doctor_id,
        service_id=service_id,
        status=status_filter,
        scheduled_from=scheduled_from,
        scheduled_to=scheduled_to,
    )


def get_appointment_for_owner_or_admin(
    db: Session,
    appointment_id: UUID,
    current_user: User,
) -> Appointment:
    appointment = _get_appointment_or_404(db, appointment_id)
    patient = None
    if current_user.role != UserRole.ADMIN.value:
        patient = _get_current_user_patient_or_404(db, current_user)
    return _ensure_owner_or_admin(appointment, current_user, patient)


def create_appointment_record(
    db: Session,
    current_user: User,
    payload: AppointmentCreate,
) -> Appointment:
    linked_patient = _get_linked_patient_or_404(db, payload.patient_id)
    _get_linked_doctor_or_404(db, payload.doctor_id)
    _get_linked_service_or_404(db, payload.service_id)

    if current_user.role != UserRole.ADMIN.value:
        current_patient = _get_current_user_patient_or_404(db, current_user)
        if linked_patient.id != current_patient.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Appointment access is not allowed",
            )

    return create_appointment(
        db,
        **payload.model_dump(),
        status=AppointmentStatus.PENDING.value,
    )


def update_appointment_status_for_current_user(
    db: Session,
    appointment_id: UUID,
    current_user: User,
    payload: AppointmentStatusUpdate,
) -> Appointment:
    appointment = get_appointment_for_owner_or_admin(db, appointment_id, current_user)
    current_status = AppointmentStatus(appointment.status)
    requested_status = payload.status

    if requested_status not in STATUS_TRANSITIONS[current_status]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid appointment status transition",
        )

    update_data: dict[str, object] = {"status": requested_status.value}

    if current_user.role != UserRole.ADMIN.value:
        if requested_status != AppointmentStatus.CANCELLED:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Patients can only cancel their own appointments",
            )
        return update_appointment(db, appointment, **update_data)

    if payload.admin_notes is not None:
        update_data["admin_notes"] = payload.admin_notes

    return update_appointment(db, appointment, **update_data)
