from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewRead
from app.services.review_service import (
    create_review_record,
    get_review_for_public,
    list_reviews_for_public,
)

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=list[ReviewRead])
def list_reviews(
    doctor_id: UUID | None = None,
    service_id: UUID | None = None,
    db: Session = Depends(get_db),
) -> list[ReviewRead]:
    reviews = list_reviews_for_public(
        db,
        doctor_id=doctor_id,
        service_id=service_id,
    )
    return [ReviewRead.model_validate(review) for review in reviews]


@router.get("/{review_id}", response_model=ReviewRead)
def get_review(review_id: UUID, db: Session = Depends(get_db)) -> ReviewRead:
    review = get_review_for_public(db, review_id)
    return ReviewRead.model_validate(review)


@router.post("", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
def create_review(
    payload: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> ReviewRead:
    review = create_review_record(db, current_user, payload)
    return ReviewRead.model_validate(review)
