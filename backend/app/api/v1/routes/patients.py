from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, require_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.patient import (
    PatientAdminRead,
    PatientAdminUpdate,
    PatientCreate,
    PatientRead,
    PatientSelfUpdate,
)
from app.services.patient_service import (
    create_patient_record,
    delete_patient_record_for_admin,
    get_patient_record_for_current_user,
    get_patient_record_for_owner_or_admin,
    list_patient_records_for_admin,
    update_patient_record_for_admin,
    update_patient_record_for_current_user,
)

router = APIRouter(prefix="/patients", tags=["patients"])


@router.get("/me", response_model=PatientRead)
def get_current_patient_record(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PatientRead:
    patient = get_patient_record_for_current_user(db, current_user)
    return PatientRead.model_validate(patient)


@router.put("/me", response_model=PatientRead)
def update_current_patient_record(
    payload: PatientSelfUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PatientRead:
    patient = update_patient_record_for_current_user(db, current_user, payload)
    return PatientRead.model_validate(patient)


@router.get("/{patient_id}", response_model=PatientRead)
def get_patient_record(
    patient_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PatientRead:
    patient = get_patient_record_for_owner_or_admin(db, patient_id, current_user)
    return PatientRead.model_validate(patient)


@router.get("", response_model=list[PatientAdminRead])
def list_patient_records(
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[PatientAdminRead]:
    patients = list_patient_records_for_admin(db)
    return [PatientAdminRead.model_validate(patient) for patient in patients]


@router.post(
    "",
    response_model=PatientAdminRead,
    status_code=status.HTTP_201_CREATED,
)
def create_patient(
    payload: PatientCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> PatientAdminRead:
    patient = create_patient_record(db, payload)
    return PatientAdminRead.model_validate(patient)


@router.put("/{patient_id}", response_model=PatientAdminRead)
def update_patient(
    patient_id: UUID,
    payload: PatientAdminUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> PatientAdminRead:
    patient = update_patient_record_for_admin(db, patient_id, payload)
    return PatientAdminRead.model_validate(patient)


@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(
    patient_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> Response:
    delete_patient_record_for_admin(db, patient_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
