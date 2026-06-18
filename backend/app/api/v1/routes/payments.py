from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, require_admin
from app.database.session import get_db
from app.models.payment import PaymentMethod, PaymentStatus
from app.models.user import User
from app.schemas.payment import (
    PaymentAdminRead,
    PaymentCreate,
    PaymentRead,
    PaymentStatusUpdate,
)
from app.services.payment_service import (
    create_payment_record,
    get_payment_for_owner_or_admin,
    list_payments_for_admin,
    list_payments_for_current_user,
    update_payment_status_for_admin,
)

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("", response_model=PaymentRead, status_code=status.HTTP_201_CREATED)
def create_payment(
    payload: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaymentRead:
    payment = create_payment_record(db, current_user, payload)
    return PaymentRead.model_validate(payment)


@router.get("", response_model=list[PaymentRead])
def list_current_user_payments(
    patient_id: UUID | None = None,
    appointment_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: PaymentStatus | None = Query(default=None, alias="status"),
    method_filter: PaymentMethod | None = Query(default=None, alias="method"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[PaymentRead]:
    payments = list_payments_for_current_user(
        db,
        current_user,
        patient_id=patient_id,
        appointment_id=appointment_id,
        service_id=service_id,
        status_filter=status_filter,
        method_filter=method_filter,
    )
    return [PaymentRead.model_validate(payment) for payment in payments]


@router.get("/admin", response_model=list[PaymentAdminRead])
def list_admin_payments(
    patient_id: UUID | None = None,
    appointment_id: UUID | None = None,
    service_id: UUID | None = None,
    status_filter: PaymentStatus | None = Query(default=None, alias="status"),
    method_filter: PaymentMethod | None = Query(default=None, alias="method"),
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[PaymentAdminRead]:
    payments = list_payments_for_admin(
        db,
        patient_id=patient_id,
        appointment_id=appointment_id,
        service_id=service_id,
        status_filter=status_filter,
        method_filter=method_filter,
    )
    return [PaymentAdminRead.model_validate(payment) for payment in payments]


@router.get("/admin/{payment_id}", response_model=PaymentAdminRead)
def get_admin_payment(
    payment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
) -> PaymentAdminRead:
    payment = get_payment_for_owner_or_admin(db, payment_id, current_user)
    return PaymentAdminRead.model_validate(payment)


@router.get("/{payment_id}", response_model=PaymentRead)
def get_payment(
    payment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> PaymentRead:
    payment = get_payment_for_owner_or_admin(db, payment_id, current_user)
    return PaymentRead.model_validate(payment)


@router.patch("/{payment_id}/status", response_model=PaymentAdminRead)
def update_payment_status(
    payment_id: UUID,
    payload: PaymentStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> PaymentAdminRead:
    payment = update_payment_status_for_admin(db, payment_id, payload)
    return PaymentAdminRead.model_validate(payment)
