from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.database.session import get_db
from app.models.user import User
from app.schemas.service import (
    ServiceAdminRead,
    ServiceCreate,
    ServiceRead,
    ServiceUpdate,
)
from app.services.service_service import (
    create_service_record,
    delete_service_record,
    get_service_for_public,
    get_services_for_public,
    update_service_record,
)

router = APIRouter(prefix="/services", tags=["services"])


@router.get("", response_model=list[ServiceRead])
def list_services(
    category: str | None = Query(default=None, min_length=1, max_length=100),
    db: Session = Depends(get_db),
) -> list[ServiceRead]:
    services = get_services_for_public(db, category=category)
    return [ServiceRead.model_validate(service) for service in services]


@router.get("/{service_id}", response_model=ServiceRead)
def get_service(service_id: UUID, db: Session = Depends(get_db)) -> ServiceRead:
    service = get_service_for_public(db, service_id)
    return ServiceRead.model_validate(service)


@router.post(
    "",
    response_model=ServiceAdminRead,
    status_code=status.HTTP_201_CREATED,
)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> ServiceAdminRead:
    service = create_service_record(db, payload)
    return ServiceAdminRead.model_validate(service)


@router.put("/{service_id}", response_model=ServiceAdminRead)
def update_service(
    service_id: UUID,
    payload: ServiceUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> ServiceAdminRead:
    service = update_service_record(db, service_id, payload)
    return ServiceAdminRead.model_validate(service)


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
) -> Response:
    delete_service_record(db, service_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
