from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID, uuid4

import pytest

from app.api import deps as auth_deps
from app.api.v1.routes import admin as admin_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import UserRole
from app.schemas.admin import AdminEntityTotals, AdminStatusCount, AdminSummaryRead


@dataclass
class DummyReview:
    id: UUID
    patient_id: UUID
    doctor_id: UUID | None
    service_id: UUID | None
    rating: int
    comment: str | None
    is_visible: bool
    admin_notes: str | None
    created_at: datetime
    updated_at: datetime


@dataclass
class DummyUser:
    id: UUID
    full_name: str
    email: str
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime


def make_user(*, role: str = UserRole.ADMIN.value) -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="Admin User",
        email=f"{role}-{uuid4().hex[:8]}@example.com",
        role=role,
        is_active=True,
        is_verified=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def make_review() -> DummyReview:
    timestamp = datetime.now(timezone.utc)
    return DummyReview(
        id=uuid4(),
        patient_id=uuid4(),
        doctor_id=uuid4(),
        service_id=None,
        rating=4,
        comment="Needs follow-up moderation review.",
        is_visible=False,
        admin_notes="Hidden pending verification.",
        created_at=timestamp,
        updated_at=timestamp,
    )


def authorize_request_as(user: DummyUser, monkeypatch: pytest.MonkeyPatch) -> str:
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: user)
    return create_access_token(str(user.id))


def test_admin_summary_returns_expected_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)
    summary = AdminSummaryRead(
        totals=AdminEntityTotals(
            users=6,
            active_users=5,
            verified_users=4,
            doctors=3,
            active_doctors=2,
            patients=4,
            active_patients=4,
            services=5,
            active_services=4,
            appointments=7,
            payments=6,
            reviews=3,
            visible_reviews=2,
        ),
        appointment_statuses=[
            AdminStatusCount(status="completed", count=2),
            AdminStatusCount(status="scheduled", count=5),
        ],
        payment_statuses=[
            AdminStatusCount(status="paid", count=4),
            AdminStatusCount(status="pending", count=2),
        ],
    )

    monkeypatch.setattr(admin_routes, "get_admin_summary", lambda db: summary)

    response = client.get(
        "/api/v1/admin/summary",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    assert response.json()["totals"]["users"] == 6
    assert response.json()["totals"]["visible_reviews"] == 2
    assert response.json()["appointment_statuses"][0] == {"status": "completed", "count": 2}


def test_admin_summary_requires_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user(role=UserRole.USER.value)
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    response = client.get(
        "/api/v1/admin/summary",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}


def test_admin_reviews_return_internal_review_fields(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    review = make_review()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    monkeypatch.setattr(admin_routes, "list_reviews_for_admin", lambda db: [review])

    response = client.get(
        "/api/v1/admin/reviews",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    payload = response.json()[0]
    assert payload["id"] == str(review.id)
    assert payload["patient_id"] == str(review.patient_id)
    assert payload["is_visible"] is False
    assert payload["admin_notes"] == review.admin_notes


def test_admin_review_visibility_update_returns_moderated_review(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    admin_user = make_user(role=UserRole.ADMIN.value)
    review = make_review()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(admin_user, monkeypatch)

    def fake_update_review_visibility_for_admin(db: object, review_id: UUID, payload: object) -> DummyReview:
        return DummyReview(
            **{
                **review.__dict__,
                "is_visible": True,
                "admin_notes": "Approved for dashboard visibility.",
            }
        )

    monkeypatch.setattr(
        admin_routes,
        "update_review_visibility_for_admin",
        fake_update_review_visibility_for_admin,
    )

    response = client.patch(
        f"/api/v1/admin/reviews/{review.id}/visibility",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "is_visible": True,
            "admin_notes": "Approved for dashboard visibility.",
        },
    )

    assert response.status_code == 200
    assert response.json()["is_visible"] is True
    assert response.json()["admin_notes"] == "Approved for dashboard visibility."


def test_admin_review_visibility_rejects_non_admin(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user(role=UserRole.USER.value)
    review = make_review()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    response = client.patch(
        f"/api/v1/admin/reviews/{review.id}/visibility",
        headers={"Authorization": f"Bearer {token}"},
        json={"is_visible": False},
    )

    assert response.status_code == 403
    assert response.json() == {"detail": "Admin access required"}
