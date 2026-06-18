from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from uuid import UUID, uuid4

import pytest
from fastapi import HTTPException

from app.services import service_service
from app.schemas.service import ServiceCreate, ServiceUpdate


@dataclass
class DummyService:
    id: UUID
    name: str
    category: str
    price: Decimal | None
    is_active: bool


def make_service() -> DummyService:
    return DummyService(
        id=uuid4(),
        name="Sports Rehabilitation",
        category="Rehabilitation",
        price=Decimal("75.00"),
        is_active=True,
    )


def test_get_service_for_public_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(service_service, "get_public_service_by_id", lambda db, service_id: None)

    with pytest.raises(HTTPException) as exc_info:
        service_service.get_service_for_public(object(), uuid4())

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Service not found"


def test_create_service_record_passes_schema_data_to_repository(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = ServiceCreate(
        name="Sports Rehabilitation",
        category="Rehabilitation",
        short_description="Targeted recovery support.",
        description="A guided rehabilitation program for sports injuries.",
        duration_minutes=60,
        price=Decimal("75.00"),
        is_active=True,
    )
    captured_create_args: dict[str, object] = {}

    def fake_create_service(db: object, **service_data: object) -> DummyService:
        captured_create_args.update(service_data)
        return make_service()

    monkeypatch.setattr(service_service, "create_service", fake_create_service)

    created_service = service_service.create_service_record(object(), payload)

    assert created_service.name == "Sports Rehabilitation"
    assert captured_create_args["name"] == payload.name
    assert captured_create_args["category"] == payload.category
    assert captured_create_args["price"] == Decimal("75.00")
    assert captured_create_args["is_active"] is True


def test_update_service_record_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    payload = ServiceUpdate(price=Decimal("85.00"))
    monkeypatch.setattr(service_service, "get_service_by_id", lambda db, service_id: None)

    with pytest.raises(HTTPException) as exc_info:
        service_service.update_service_record(object(), uuid4(), payload)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Service not found"


def test_delete_service_record_raises_not_found_when_missing(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(service_service, "get_service_by_id", lambda db, service_id: None)

    with pytest.raises(HTTPException) as exc_info:
        service_service.delete_service_record(object(), uuid4())

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Service not found"
