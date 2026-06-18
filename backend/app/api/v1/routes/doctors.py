from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.doctor import DoctorAdminRead, DoctorCreate, DoctorRead, DoctorUpdate
from app.services.doctor_service import (
    create_doctor_record,
    delete_doctor_record,
    get_doctor_for_public,
    get_doctors_for_public,
    update_doctor_record,
)

router = APIRouter(prefix="/doctors", tags=["doctors"])


@router.get("", response_model=list[DoctorRead])
def list_doctors(
    specialty: str | None = Query(default=None, min_length=1, max_length=255),
    is_accepting_new_patients: bool | None = None,
    db: Session = Depends(get_db),
) -> list[DoctorRead]:
    doctors = get_doctors_for_public(
        db,
        specialty=specialty,
        is_accepting_new_patients=is_accepting_new_patients,
    )
    return [DoctorRead.model_validate(doctor) for doctor in doctors]


@router.get("/{doctor_id}", response_model=DoctorRead)
def get_doctor(doctor_id: UUID, db: Session = Depends(get_db)) -> DoctorRead:
    doctor = get_doctor_for_public(db, doctor_id)
    return DoctorRead.model_validate(doctor)


@router.post(
    "",
    response_model=DoctorAdminRead,
    status_code=status.HTTP_201_CREATED,
)
def create_doctor(
    payload: DoctorCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> DoctorAdminRead:
    doctor = create_doctor_record(db, payload)
    return DoctorAdminRead.model_validate(doctor)


@router.put("/{doctor_id}", response_model=DoctorAdminRead)
def update_doctor(
    doctor_id: UUID,
    payload: DoctorUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> DoctorAdminRead:
    doctor = update_doctor_record(db, doctor_id, payload)
    return DoctorAdminRead.model_validate(doctor)


@router.delete("/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doctor(
    doctor_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> Response:
    delete_doctor_record(db, doctor_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
