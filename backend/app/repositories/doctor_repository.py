from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.doctor import Doctor


def _apply_public_filters(
    statement: Select[tuple[Doctor]],
    *,
    specialty: str | None = None,
    is_accepting_new_patients: bool | None = None,
) -> Select[tuple[Doctor]]:
    statement = statement.where(Doctor.is_active.is_(True))

    if specialty is not None:
        statement = statement.where(Doctor.specialty == specialty)

    if is_accepting_new_patients is not None:
        statement = statement.where(
            Doctor.is_accepting_new_patients.is_(is_accepting_new_patients)
        )

    return statement


def list_public_doctors(
    db: Session,
    *,
    specialty: str | None = None,
    is_accepting_new_patients: bool | None = None,
) -> list[Doctor]:
    statement = select(Doctor).order_by(Doctor.full_name.asc())
    statement = _apply_public_filters(
        statement,
        specialty=specialty,
        is_accepting_new_patients=is_accepting_new_patients,
    )
    return list(db.scalars(statement))


def get_public_doctor_by_id(db: Session, doctor_id: UUID) -> Doctor | None:
    statement = select(Doctor).where(Doctor.id == doctor_id)
    statement = _apply_public_filters(statement)
    return db.scalar(statement)


def get_doctor_by_id(db: Session, doctor_id: UUID) -> Doctor | None:
    statement = select(Doctor).where(Doctor.id == doctor_id)
    return db.scalar(statement)


def create_doctor(db: Session, **doctor_data: object) -> Doctor:
    doctor = Doctor(**doctor_data)
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor


def update_doctor(db: Session, doctor: Doctor, **doctor_data: object) -> Doctor:
    for field_name, value in doctor_data.items():
        setattr(doctor, field_name, value)

    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor


def delete_doctor(db: Session, doctor: Doctor) -> None:
    db.delete(doctor)
    db.commit()
