from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException, status

from app.api import deps as auth_deps
from app.api.v1.routes import reviews as review_routes
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import UserRole


@dataclass
class DummyReview:
    id: UUID
    doctor_id: UUID | None
    service_id: UUID | None
    rating: int
    comment: str | None
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


def make_user(*, role: str = UserRole.USER.value) -> DummyUser:
    timestamp = datetime.now(timezone.utc)
    return DummyUser(
        id=uuid4(),
        full_name="Review User",
        email=f"{role}-{uuid4().hex[:8]}@example.com",
        role=role,
        is_active=True,
        is_verified=True,
        created_at=timestamp,
        updated_at=timestamp,
    )


def make_review(*, doctor_id: UUID | None = None, service_id: UUID | None = None) -> DummyReview:
    timestamp = datetime.now(timezone.utc)
    return DummyReview(
        id=uuid4(),
        doctor_id=doctor_id,
        service_id=service_id,
        rating=5,
        comment="Very helpful treatment.",
        created_at=timestamp,
        updated_at=timestamp,
    )


def authorize_request_as(user: DummyUser, monkeypatch: pytest.MonkeyPatch) -> str:
    monkeypatch.setattr(auth_deps, "_resolve_subject_to_user", lambda db, subject: user)
    return create_access_token(str(user.id))


def test_list_reviews_returns_public_payloads(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    doctor_id = uuid4()
    review = make_review(doctor_id=doctor_id)
    captured_filters: dict[str, object] = {}

    def fake_list_reviews_for_public(
        db: object,
        *,
        doctor_id: UUID | None = None,
        service_id: UUID | None = None,
    ) -> list[DummyReview]:
        captured_filters["doctor_id"] = doctor_id
        captured_filters["service_id"] = service_id
        return [review]

    monkeypatch.setattr(review_routes, "list_reviews_for_public", fake_list_reviews_for_public)

    response = client.get("/api/v1/reviews", params={"doctor_id": str(doctor_id)})

    assert response.status_code == 200
    assert captured_filters["doctor_id"] == doctor_id
    assert response.json() == [
        {
            "id": str(review.id),
            "doctor_id": str(review.doctor_id),
            "service_id": None,
            "rating": review.rating,
            "comment": review.comment,
            "created_at": review.created_at.isoformat().replace("+00:00", "Z"),
            "updated_at": review.updated_at.isoformat().replace("+00:00", "Z"),
        }
    ]


def test_get_review_returns_public_detail(client, monkeypatch: pytest.MonkeyPatch) -> None:
    service_id = uuid4()
    review = make_review(service_id=service_id)
    monkeypatch.setattr(review_routes, "get_review_for_public", lambda db, review_id: review)

    response = client.get(f"/api/v1/reviews/{review.id}")

    assert response.status_code == 200
    assert response.json()["id"] == str(review.id)
    assert response.json()["service_id"] == str(service_id)


def test_create_review_requires_authentication(client) -> None:
    response = client.post(
        "/api/v1/reviews",
        json={"doctor_id": str(uuid4()), "rating": 5},
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Missing bearer token"}


def test_create_review_returns_owner_payload(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    review = make_review(doctor_id=uuid4())
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    monkeypatch.setattr(review_routes, "create_review_record", lambda db, current_user, payload: review)

    response = client.post(
        "/api/v1/reviews",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "doctor_id": str(review.doctor_id),
            "rating": review.rating,
            "comment": review.comment,
        },
    )

    assert response.status_code == 201
    assert response.json()["doctor_id"] == str(review.doctor_id)
    assert response.json()["rating"] == review.rating


def test_create_review_rejects_invalid_rating_before_service_call(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)
    service_called = False

    def fake_create_review_record(db: object, current_user: DummyUser, payload: object) -> DummyReview:
        nonlocal service_called
        service_called = True
        raise AssertionError("Service should not be called for invalid payloads")

    monkeypatch.setattr(review_routes, "create_review_record", fake_create_review_record)

    response = client.post(
        "/api/v1/reviews",
        headers={"Authorization": f"Bearer {token}"},
        json={"doctor_id": str(uuid4()), "rating": 6},
    )

    assert response.status_code == 422
    assert service_called is False


def test_create_review_returns_duplicate_error(
    client,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.main import app

    current_user = make_user()
    app.dependency_overrides[get_db] = lambda: object()
    token = authorize_request_as(current_user, monkeypatch)

    def fake_create_review_record(db: object, current_user: DummyUser, payload: object) -> DummyReview:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Review already exists for this target",
        )

    monkeypatch.setattr(review_routes, "create_review_record", fake_create_review_record)

    response = client.post(
        "/api/v1/reviews",
        headers={"Authorization": f"Bearer {token}"},
        json={"service_id": str(uuid4()), "rating": 5},
    )

    assert response.status_code == 409
    assert response.json() == {"detail": "Review already exists for this target"}
