from __future__ import annotations

from pydantic import BaseModel, Field


class AdminStatusCount(BaseModel):
    status: str
    count: int = Field(ge=0)


class AdminEntityTotals(BaseModel):
    users: int = Field(ge=0)
    active_users: int = Field(ge=0)
    verified_users: int = Field(ge=0)
    doctors: int = Field(ge=0)
    active_doctors: int = Field(ge=0)
    patients: int = Field(ge=0)
    active_patients: int = Field(ge=0)
    services: int = Field(ge=0)
    active_services: int = Field(ge=0)
    appointments: int = Field(ge=0)
    payments: int = Field(ge=0)
    reviews: int = Field(ge=0)
    visible_reviews: int = Field(ge=0)


class AdminSummaryRead(BaseModel):
    totals: AdminEntityTotals
    appointment_statuses: list[AdminStatusCount]
    payment_statuses: list[AdminStatusCount]
