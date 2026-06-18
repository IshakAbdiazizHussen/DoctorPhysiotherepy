from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.payment import Payment, PaymentMethod, PaymentStatus


def _apply_filters(
    statement: Select[tuple[Payment]],
    *,
    patient_id: UUID | None = None,
    appointment_id: UUID | None = None,
    service_id: UUID | None = None,
    status: PaymentStatus | None = None,
    method: PaymentMethod | None = None,
) -> Select[tuple[Payment]]:
    if patient_id is not None:
        statement = statement.where(Payment.patient_id == patient_id)

    if appointment_id is not None:
        statement = statement.where(Payment.appointment_id == appointment_id)

    if service_id is not None:
        statement = statement.where(Payment.service_id == service_id)

    if status is not None:
        statement = statement.where(Payment.status == status.value)

    if method is not None:
        statement = statement.where(Payment.method == method.value)

    return statement


def list_payments(
    db: Session,
    *,
    patient_id: UUID | None = None,
    appointment_id: UUID | None = None,
    service_id: UUID | None = None,
    status: PaymentStatus | None = None,
    method: PaymentMethod | None = None,
) -> list[Payment]:
    statement = select(Payment).order_by(Payment.created_at.asc())
    statement = _apply_filters(
        statement,
        patient_id=patient_id,
        appointment_id=appointment_id,
        service_id=service_id,
        status=status,
        method=method,
    )
    return list(db.scalars(statement))


def get_payment_by_id(db: Session, payment_id: UUID) -> Payment | None:
    statement = select(Payment).where(Payment.id == payment_id)
    return db.scalar(statement)


def create_payment(db: Session, **payment_data: object) -> Payment:
    payment = Payment(**payment_data)
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


def update_payment(db: Session, payment: Payment, **payment_data: object) -> Payment:
    for field_name, value in payment_data.items():
        setattr(payment, field_name, value)

    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment
