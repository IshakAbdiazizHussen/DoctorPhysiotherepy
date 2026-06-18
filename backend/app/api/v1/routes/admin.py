from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.admin import AdminSummaryRead
from app.schemas.review import ReviewAdminRead, ReviewVisibilityUpdate
from app.services.admin_service import get_admin_summary
from app.services.review_service import (
    get_review_for_admin,
    list_reviews_for_admin,
    update_review_visibility_for_admin,
)

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/summary", response_model=AdminSummaryRead)
def read_admin_summary(
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> AdminSummaryRead:
    return get_admin_summary(db)


@router.get("/reviews", response_model=list[ReviewAdminRead])
def list_admin_reviews(
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[ReviewAdminRead]:
    reviews = list_reviews_for_admin(db)
    return [ReviewAdminRead.model_validate(review) for review in reviews]


@router.get("/reviews/{review_id}", response_model=ReviewAdminRead)
def read_admin_review(
    review_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> ReviewAdminRead:
    review = get_review_for_admin(db, review_id)
    return ReviewAdminRead.model_validate(review)


@router.patch("/reviews/{review_id}/visibility", response_model=ReviewAdminRead)
def update_admin_review_visibility(
    review_id: UUID,
    payload: ReviewVisibilityUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> ReviewAdminRead:
    review = update_review_visibility_for_admin(db, review_id, payload)
    return ReviewAdminRead.model_validate(review)
