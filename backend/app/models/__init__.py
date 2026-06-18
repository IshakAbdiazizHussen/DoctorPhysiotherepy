"""
Import SQLAlchemy model modules here so Alembic autogenerate can discover them.

Example:
    from app.models.example import ExampleModel
"""

from app.models.doctor import Doctor
from app.models.user import User, UserRole

__all__ = ["User", "UserRole", "Doctor"]
