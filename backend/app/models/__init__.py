"""
Import SQLAlchemy model modules here so Alembic autogenerate can discover them.

Example:
    from app.models.example import ExampleModel
"""

from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.service import Service
from app.models.user import User, UserRole
from app.models.appointment import Appointment, AppointmentStatus

__all__ = [
    "User",
    "UserRole",
    "Doctor",
    "Patient",
    "Service",
    "Appointment",
    "AppointmentStatus",
]
