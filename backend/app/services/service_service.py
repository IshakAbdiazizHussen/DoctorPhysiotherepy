from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.service import Service
from app.repositories.service_repository import (
    create_service,
    delete_service,
    get_public_service_by_id,
    get_service_by_id,
    list_public_services,
    update_service,
)
from app.schemas.service import ServiceCreate, ServiceUpdate


def get_services_for_public(
    db: Session,
    *,
    category: str | None = None,
) -> list[Service]:
    return list_public_services(db, category=category)


def get_service_for_public(db: Session, service_id: UUID) -> Service:
    service = get_public_service_by_id(db, service_id)
    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )
    return service


def create_service_record(db: Session, payload: ServiceCreate) -> Service:
    return create_service(db, **payload.model_dump())


def update_service_record(
    db: Session,
    service_id: UUID,
    payload: ServiceUpdate,
) -> Service:
    service = get_service_by_id(db, service_id)
    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )

    update_data = payload.model_dump(exclude_unset=True)
    return update_service(db, service, **update_data)


def delete_service_record(db: Session, service_id: UUID) -> None:
    service = get_service_by_id(db, service_id)
    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )

    delete_service(db, service)
