from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from app.models.service import Service


def _apply_public_filters(
    statement: Select[tuple[Service]],
    *,
    category: str | None = None,
) -> Select[tuple[Service]]:
    statement = statement.where(Service.is_active.is_(True))

    if category is not None:
        statement = statement.where(Service.category == category)

    return statement


def list_public_services(
    db: Session,
    *,
    category: str | None = None,
) -> list[Service]:
    statement = select(Service).order_by(Service.name.asc())
    statement = _apply_public_filters(statement, category=category)
    return list(db.scalars(statement))


def get_public_service_by_id(db: Session, service_id: UUID) -> Service | None:
    statement = select(Service).where(Service.id == service_id)
    statement = _apply_public_filters(statement)
    return db.scalar(statement)


def get_service_by_id(db: Session, service_id: UUID) -> Service | None:
    statement = select(Service).where(Service.id == service_id)
    return db.scalar(statement)


def create_service(db: Session, **service_data: object) -> Service:
    service = Service(**service_data)
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def update_service(db: Session, service: Service, **service_data: object) -> Service:
    for field_name, value in service_data.items():
        setattr(service, field_name, value)

    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def delete_service(db: Session, service: Service) -> None:
    db.delete(service)
    db.commit()
