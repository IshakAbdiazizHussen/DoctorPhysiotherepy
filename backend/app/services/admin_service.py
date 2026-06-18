from __future__ import annotations

from sqlalchemy.orm import Session

from app.repositories.admin_repository import (
    get_admin_totals,
    list_appointment_status_counts,
    list_payment_status_counts,
)
from app.schemas.admin import AdminEntityTotals, AdminStatusCount, AdminSummaryRead


def get_admin_summary(db: Session) -> AdminSummaryRead:
    totals = AdminEntityTotals(**get_admin_totals(db))
    appointment_statuses = [
        AdminStatusCount(status=status, count=count)
        for status, count in list_appointment_status_counts(db)
    ]
    payment_statuses = [
        AdminStatusCount(status=status, count=count)
        for status, count in list_payment_status_counts(db)
    ]
    return AdminSummaryRead(
        totals=totals,
        appointment_statuses=appointment_statuses,
        payment_statuses=payment_statuses,
    )
