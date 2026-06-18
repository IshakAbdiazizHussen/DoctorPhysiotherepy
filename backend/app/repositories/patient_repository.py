from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.patient import Patient


def list_patients(db: Session) -> list[Patient]:
    statement = select(Patient).order_by(Patient.created_at.asc())
    return list(db.scalars(statement))


def get_patient_by_id(db: Session, patient_id: UUID) -> Patient | None:
    statement = select(Patient).where(Patient.id == patient_id)
    return db.scalar(statement)


def get_patient_by_user_id(db: Session, user_id: UUID) -> Patient | None:
    statement = select(Patient).where(Patient.user_id == user_id)
    return db.scalar(statement)


def create_patient(db: Session, **patient_data: object) -> Patient:
    patient = Patient(**patient_data)
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def update_patient(db: Session, patient: Patient, **patient_data: object) -> Patient:
    for field_name, value in patient_data.items():
        setattr(patient, field_name, value)

    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def delete_patient(db: Session, patient: Patient) -> None:
    db.delete(patient)
    db.commit()
