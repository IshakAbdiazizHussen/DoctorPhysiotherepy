from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.payment import Payment
from app.models.review import Review
from app.models.service import Service
from app.models.user import User


def _count_rows(db: Session, model: type[object]) -> int:
    return int(db.scalar(select(func.count()).select_from(model)) or 0)


def _count_true_rows(db: Session, model: type[object], column: object) -> int:
    return int(db.scalar(select(func.count()).select_from(model).where(column.is_(True))) or 0)


def get_admin_totals(db: Session) -> dict[str, int]:
    return {
        "users": _count_rows(db, User),
        "active_users": _count_true_rows(db, User, User.is_active),
        "verified_users": _count_true_rows(db, User, User.is_verified),
        "doctors": _count_rows(db, Doctor),
        "active_doctors": _count_true_rows(db, Doctor, Doctor.is_active),
        "patients": _count_rows(db, Patient),
        "active_patients": _count_true_rows(db, Patient, Patient.is_active),
        "services": _count_rows(db, Service),
        "active_services": _count_true_rows(db, Service, Service.is_active),
        "appointments": _count_rows(db, Appointment),
        "payments": _count_rows(db, Payment),
        "reviews": _count_rows(db, Review),
        "visible_reviews": _count_true_rows(db, Review, Review.is_visible),
    }


def list_appointment_status_counts(db: Session) -> list[tuple[str, int]]:
    statement = (
        select(Appointment.status, func.count())
        .select_from(Appointment)
        .group_by(Appointment.status)
        .order_by(Appointment.status.asc())
    )
    return [(str(status), int(count)) for status, count in db.execute(statement).all()]


def list_payment_status_counts(db: Session) -> list[tuple[str, int]]:
    statement = (
        select(Payment.status, func.count())
        .select_from(Payment)
        .group_by(Payment.status)
        .order_by(Payment.status.asc())
    )
    return [(str(status), int(count)) for status, count in db.execute(statement).all()]
