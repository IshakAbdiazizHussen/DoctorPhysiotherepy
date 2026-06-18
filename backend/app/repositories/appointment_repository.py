from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.appointment import Appointment, AppointmentStatus


def _apply_filters(
    statement: Select[tuple[Appointment]],
    *,
    patient_id: UUID | None = None,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    status: AppointmentStatus | None = None,
    scheduled_from: datetime | None = None,
    scheduled_to: datetime | None = None,
) -> Select[tuple[Appointment]]:
    if patient_id is not None:
        statement = statement.where(Appointment.patient_id == patient_id)

    if doctor_id is not None:
        statement = statement.where(Appointment.doctor_id == doctor_id)

    if service_id is not None:
        statement = statement.where(Appointment.service_id == service_id)

    if status is not None:
        statement = statement.where(Appointment.status == status.value)

    if scheduled_from is not None:
        statement = statement.where(Appointment.scheduled_at >= scheduled_from)

    if scheduled_to is not None:
        statement = statement.where(Appointment.scheduled_at <= scheduled_to)

    return statement


def list_appointments(
    db: Session,
    *,
    patient_id: UUID | None = None,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    status: AppointmentStatus | None = None,
    scheduled_from: datetime | None = None,
    scheduled_to: datetime | None = None,
) -> list[Appointment]:
    statement = select(Appointment).order_by(Appointment.scheduled_at.asc())
    statement = _apply_filters(
        statement,
        patient_id=patient_id,
        doctor_id=doctor_id,
        service_id=service_id,
        status=status,
        scheduled_from=scheduled_from,
        scheduled_to=scheduled_to,
    )
    return list(db.scalars(statement))


def get_appointment_by_id(db: Session, appointment_id: UUID) -> Appointment | None:
    statement = select(Appointment).where(Appointment.id == appointment_id)
    return db.scalar(statement)


def create_appointment(db: Session, **appointment_data: object) -> Appointment:
    appointment = Appointment(**appointment_data)
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


def update_appointment(
    db: Session,
    appointment: Appointment,
    **appointment_data: object,
) -> Appointment:
    for field_name, value in appointment_data.items():
        setattr(appointment, field_name, value)

    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment
