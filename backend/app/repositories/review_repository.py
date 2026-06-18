from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.review import Review


def _apply_target_filters(
    statement: Select[tuple[Review]],
    *,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    visible_only: bool = False,
) -> Select[tuple[Review]]:
    if visible_only:
        statement = statement.where(Review.is_visible.is_(True))

    if doctor_id is not None:
        statement = statement.where(Review.doctor_id == doctor_id)

    if service_id is not None:
        statement = statement.where(Review.service_id == service_id)

    return statement


def list_public_reviews(
    db: Session,
    *,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
) -> list[Review]:
    statement = select(Review).order_by(Review.created_at.desc())
    statement = _apply_target_filters(
        statement,
        doctor_id=doctor_id,
        service_id=service_id,
        visible_only=True,
    )
    return list(db.scalars(statement))


def get_public_review_by_id(db: Session, review_id: UUID) -> Review | None:
    statement = select(Review).where(Review.id == review_id, Review.is_visible.is_(True))
    return db.scalar(statement)


def get_review_by_id(db: Session, review_id: UUID) -> Review | None:
    statement = select(Review).where(Review.id == review_id)
    return db.scalar(statement)


def get_review_by_patient_and_target(
    db: Session,
    *,
    patient_id: UUID,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
) -> Review | None:
    statement = select(Review).where(Review.patient_id == patient_id)
    statement = _apply_target_filters(
        statement,
        doctor_id=doctor_id,
        service_id=service_id,
    )
    return db.scalar(statement)


def create_review(db: Session, **review_data: object) -> Review:
    review = Review(**review_data)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
