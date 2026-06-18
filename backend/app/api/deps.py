from __future__ import annotations

from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.database.session import get_db
from app.models.user import User, UserRole

bearer_scheme = HTTPBearer(auto_error=False)


def _credentials_exception(detail: str = "Could not validate credentials") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def _forbidden_exception(detail: str = "Not enough permissions") -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=detail,
    )


def _resolve_subject_to_user(db: Session, subject: str) -> User | None:
    try:
        user_id = UUID(subject)
    except ValueError:
        user_id = None

    statement = (
        select(User).where(User.id == user_id)
        if user_id is not None
        else select(User).where(User.email == subject)
    )

    return db.scalar(statement)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise _credentials_exception("Missing bearer token")

    payload = decode_access_token(credentials.credentials)
    if payload is None:
        raise _credentials_exception("Invalid or expired token")

    subject = payload.get("sub")
    if not isinstance(subject, str) or not subject.strip():
        raise _credentials_exception("Token subject is missing")

    user = _resolve_subject_to_user(db, subject)
    if user is None:
        raise _credentials_exception("User not found")

    return user


def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_active:
        raise _forbidden_exception("Inactive user")

    return current_user


def require_roles(
    *allowed_roles: UserRole | str,
    detail: str = "Not enough permissions",
):
    normalized_roles = tuple(
        role.value if isinstance(role, UserRole) else str(role)
        for role in allowed_roles
    )

    if not normalized_roles:
        raise ValueError("At least one allowed role must be provided")

    def role_dependency(current_user: User = Depends(get_current_active_user)) -> User:
        if current_user.role not in normalized_roles:
            raise _forbidden_exception(detail)
        return current_user

    return role_dependency


require_admin = require_roles(UserRole.ADMIN, detail="Admin access required")
