from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.doctor import Doctor
from app.repositories.doctor_repository import (
    create_doctor,
    delete_doctor,
    get_doctor_by_id,
    get_public_doctor_by_id,
    list_public_doctors,
    update_doctor,
)
from app.schemas.doctor import DoctorCreate, DoctorUpdate


def get_doctors_for_public(
    db: Session,
    *,
    specialty: str | None = None,
    is_accepting_new_patients: bool | None = None,
) -> list[Doctor]:
    return list_public_doctors(
        db,
        specialty=specialty,
        is_accepting_new_patients=is_accepting_new_patients,
    )


def get_doctor_for_public(db: Session, doctor_id: UUID) -> Doctor:
    doctor = get_public_doctor_by_id(db, doctor_id)
    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )
    return doctor


def create_doctor_record(db: Session, payload: DoctorCreate) -> Doctor:
    return create_doctor(db, **payload.model_dump())


def update_doctor_record(db: Session, doctor_id: UUID, payload: DoctorUpdate) -> Doctor:
    doctor = get_doctor_by_id(db, doctor_id)
    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )

    update_data = payload.model_dump(exclude_unset=True)
    return update_doctor(db, doctor, **update_data)


def delete_doctor_record(db: Session, doctor_id: UUID) -> None:
    doctor = get_doctor_by_id(db, doctor_id)
    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )

    delete_doctor(db, doctor)
