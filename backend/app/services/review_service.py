from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.appointment import AppointmentStatus
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.review import Review
from app.models.service import Service
from app.models.user import User
from app.repositories.appointment_repository import list_appointments
from app.repositories.doctor_repository import get_doctor_by_id
from app.repositories.patient_repository import get_patient_by_user_id
from app.repositories.review_repository import (
    create_review,
    get_public_review_by_id,
    get_review_by_id,
    get_review_by_patient_and_target,
    list_reviews,
    list_public_reviews,
    update_review,
)
from app.repositories.service_repository import get_service_by_id
from app.schemas.review import ReviewCreate, ReviewVisibilityUpdate


def _get_current_user_patient_or_404(db: Session, current_user: User) -> Patient:
    patient = get_patient_by_user_id(db, current_user.id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient record not found",
        )
    return patient


def _get_target_or_404(
    db: Session,
    *,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
) -> Doctor | Service:
    if doctor_id is not None:
        doctor = get_doctor_by_id(db, doctor_id)
        if doctor is None or not doctor.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Review target not found",
            )
        return doctor

    service = get_service_by_id(db, service_id)
    if service is None or not service.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review target not found",
        )
    return service


def _ensure_patient_is_eligible(
    db: Session,
    *,
    patient_id: UUID,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
) -> None:
    appointments = list_appointments(
        db,
        patient_id=patient_id,
        doctor_id=doctor_id,
        service_id=service_id,
        status=AppointmentStatus.COMPLETED,
    )
    if not appointments:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Patient is not eligible to review this target",
        )


def list_reviews_for_public(
    db: Session,
    *,
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
) -> list[Review]:
    return list_public_reviews(
        db,
        doctor_id=doctor_id,
        service_id=service_id,
    )


def get_review_for_public(db: Session, review_id: UUID) -> Review:
    review = get_public_review_by_id(db, review_id)
    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )
    return review


def list_reviews_for_admin(db: Session) -> list[Review]:
    return list_reviews(db)


def get_review_for_admin(db: Session, review_id: UUID) -> Review:
    review = get_review_by_id(db, review_id)
    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )
    return review


def update_review_visibility_for_admin(
    db: Session,
    review_id: UUID,
    payload: ReviewVisibilityUpdate,
) -> Review:
    review = get_review_for_admin(db, review_id)
    update_data = payload.model_dump(exclude_unset=True)
    return update_review(db, review, **update_data)


def create_review_record(
    db: Session,
    current_user: User,
    payload: ReviewCreate,
) -> Review:
    patient = _get_current_user_patient_or_404(db, current_user)
    _get_target_or_404(
        db,
        doctor_id=payload.doctor_id,
        service_id=payload.service_id,
    )
    _ensure_patient_is_eligible(
        db,
        patient_id=patient.id,
        doctor_id=payload.doctor_id,
        service_id=payload.service_id,
    )

    existing_review = get_review_by_patient_and_target(
        db,
        patient_id=patient.id,
        doctor_id=payload.doctor_id,
        service_id=payload.service_id,
    )
    if existing_review is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Review already exists for this target",
        )

    return create_review(
        db,
        patient_id=patient.id,
        **payload.model_dump(),
    )
