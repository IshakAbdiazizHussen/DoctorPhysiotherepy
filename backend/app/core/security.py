from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

ALGORITHM = "HS256"
BCRYPT_PASSWORD_MAX_BYTES = 72
TOKEN_SUBJECT_CLAIM = "sub"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_secret_key() -> str:
    return settings.SECRET_KEY


def validate_password_bytes_length(password: str) -> str:
    if len(password.encode("utf-8")) > BCRYPT_PASSWORD_MAX_BYTES:
        raise ValueError(
            f"Password cannot be longer than {BCRYPT_PASSWORD_MAX_BYTES} bytes."
        )
    return password


def hash_password(password: str) -> str:
    validate_password_bytes_length(password)
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        validate_password_bytes_length(plain_password)
        return pwd_context.verify(plain_password, hashed_password)
    except ValueError:
        return False


def create_access_token(subject: str, expires_delta: timedelta | None = None, **extra_claims: Any) -> str:
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload: dict[str, Any] = {
        TOKEN_SUBJECT_CLAIM: subject,
        "exp": expire,
        **extra_claims,
    }
    return jwt.encode(payload, get_secret_key(), algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        return jwt.decode(token, get_secret_key(), algorithms=[ALGORITHM])
    except JWTError:
        return None
