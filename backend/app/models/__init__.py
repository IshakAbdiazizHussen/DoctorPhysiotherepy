"""
Import SQLAlchemy model modules here so Alembic autogenerate can discover them.

Example:
    from app.models.example import ExampleModel
"""

from app.models.user import User

__all__ = ["User"]
