import hashlib
import secrets

from app.core.config import settings


def get_secret_key() -> str:
    return settings.SECRET_KEY


def hash_value(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def generate_token(length: int = 32) -> str:
    return secrets.token_urlsafe(length)
