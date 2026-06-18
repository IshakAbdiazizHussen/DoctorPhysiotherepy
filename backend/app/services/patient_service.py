from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.user import User, UserRole
from app.repositories.patient_repository import (
    create_patient,
    delete_patient,
    get_patient_by_id,
    get_patient_by_user_id,
    list_patients,
    update_patient,
)
from app.repositories.user_repository import get_user_by_id
from app.schemas.patient import PatientAdminUpdate, PatientCreate, PatientSelfUpdate


def _get_patient_or_404(db: Session, patient_id: UUID) -> Patient:
    patient = get_patient_by_id(db, patient_id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return patient


def _ensure_owner_or_admin(patient: Patient, current_user: User) -> Patient:
    if current_user.role == UserRole.ADMIN.value or patient.user_id == current_user.id:
        return patient

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Patient access is not allowed",
    )


def list_patient_records_for_admin(db: Session) -> list[Patient]:
    return list_patients(db)


def get_patient_record_for_current_user(db: Session, current_user: User) -> Patient:
    patient = get_patient_by_user_id(db, current_user.id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient record not found",
        )
    return patient


def get_patient_record_for_owner_or_admin(
    db: Session,
    patient_id: UUID,
    current_user: User,
) -> Patient:
    patient = _get_patient_or_404(db, patient_id)
    return _ensure_owner_or_admin(patient, current_user)


def create_patient_record(db: Session, payload: PatientCreate) -> Patient:
    if get_user_by_id(db, payload.user_id) is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Linked user not found",
        )

    if get_patient_by_user_id(db, payload.user_id) is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Patient record already exists for this user",
        )

    return create_patient(db, **payload.model_dump())


def update_patient_record_for_current_user(
    db: Session,
    current_user: User,
    payload: PatientSelfUpdate,
) -> Patient:
    patient = get_patient_record_for_current_user(db, current_user)
    update_data = payload.model_dump(exclude_unset=True)
    return update_patient(db, patient, **update_data)


def update_patient_record_for_admin(
    db: Session,
    patient_id: UUID,
    payload: PatientAdminUpdate,
) -> Patient:
    patient = _get_patient_or_404(db, patient_id)
    update_data = payload.model_dump(exclude_unset=True)
    return update_patient(db, patient, **update_data)


def delete_patient_record_for_admin(db: Session, patient_id: UUID) -> None:
    patient = _get_patient_or_404(db, patient_id)
    delete_patient(db, patient)
