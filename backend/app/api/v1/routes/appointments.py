from __future__ import annotations

from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, require_admin
from app.database.session import get_db
from app.models.appointment import AppointmentStatus
from app.models.user import User
from app.schemas.appointment import (
    AppointmentAdminRead,
    AppointmentCreate,
    AppointmentRead,
    AppointmentStatusUpdate,
)
from app.services.appointment_service import (
    create_appointment_record,
    get_appointment_for_owner_or_admin,
    list_appointments_for_admin,
    list_appointments_for_current_user,
    update_appointment_status_for_current_user,
)

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("", response_model=AppointmentRead, status_code=status.HTTP_201_CREATED)
def create_appointment(
    payload: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AppointmentRead:
    appointment = create_appointment_record(db, current_user, payload)
    return AppointmentRead.model_validate(appointment)


@router.get("", response_model=list[AppointmentRead])
def list_current_user_appointments(
    patient_id: UUID | None = None,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: AppointmentStatus | None = Query(default=None, alias="status"),
    scheduled_from: datetime | None = None,
    scheduled_to: datetime | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[AppointmentRead]:
    appointments = list_appointments_for_current_user(
        db,
        current_user,
        patient_id=patient_id,
        doctor_id=doctor_id,
        service_id=service_id,
        status_filter=status_filter,
        scheduled_from=scheduled_from,
        scheduled_to=scheduled_to,
    )
    return [AppointmentRead.model_validate(appointment) for appointment in appointments]


@router.get("/admin", response_model=list[AppointmentAdminRead])
def list_admin_appointments(
    patient_id: UUID | None = None,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: AppointmentStatus | None = Query(default=None, alias="status"),
    scheduled_from: datetime | None = None,
    scheduled_to: datetime | None = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[AppointmentAdminRead]:
    appointments = list_appointments_for_admin(
        db,
        patient_id=patient_id,
        doctor_id=doctor_id,
        service_id=service_id,
        status_filter=status_filter,
        scheduled_from=scheduled_from,
        scheduled_to=scheduled_to,
    )
    return [AppointmentAdminRead.model_validate(appointment) for appointment in appointments]


@router.get("/admin/{appointment_id}", response_model=AppointmentAdminRead)
def get_admin_appointment(
    appointment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
) -> AppointmentAdminRead:
    appointment = get_appointment_for_owner_or_admin(db, appointment_id, current_user)
    return AppointmentAdminRead.model_validate(appointment)


@router.get("/{appointment_id}", response_model=AppointmentRead)
def get_appointment(
    appointment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AppointmentRead:
    appointment = get_appointment_for_owner_or_admin(db, appointment_id, current_user)
    return AppointmentRead.model_validate(appointment)


@router.patch("/{appointment_id}/status", response_model=AppointmentRead)
def update_appointment_status(
    appointment_id: UUID,
    payload: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> AppointmentRead:
    appointment = update_appointment_status_for_current_user(
        db,
        appointment_id,
        current_user,
        payload,
    )
    return AppointmentRead.model_validate(appointment)
