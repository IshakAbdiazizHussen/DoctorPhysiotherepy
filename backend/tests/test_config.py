from __future__ import annotations

import pytest
from pydantic import ValidationError

from app.core.config import MIN_PRODUCTION_SECRET_KEY_LENGTH, Settings


def build_settings(**overrides: object) -> Settings:
    values: dict[str, object] = {
        "ENVIRONMENT": "development",
        "DATABASE_URL": "postgresql+psycopg://postgres:postgres@localhost:5432/doctorphysio_db",
        "REDIS_URL": "redis://localhost:6379/0",
        "SECRET_KEY": "local-development-secret-key-value",
        "ACCESS_TOKEN_EXPIRE_MINUTES": 30,
        "BACKEND_CORS_ORIGINS": "http://localhost:3000,http://127.0.0.1:3000",
    }
    values.update(overrides)
    return Settings(_env_file=None, **values)


def test_cors_origins_are_trimmed_and_normalized() -> None:
    settings = build_settings(
        BACKEND_CORS_ORIGINS=" http://localhost:3000/ , http://127.0.0.1:3000/ "
    )

    assert settings.BACKEND_CORS_ORIGINS == [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


def test_cors_origins_reject_wildcard() -> None:
    with pytest.raises(ValidationError):
        build_settings(BACKEND_CORS_ORIGINS="*")


def test_production_settings_reject_placeholder_secret_key() -> None:
    with pytest.raises(ValidationError):
        build_settings(
            ENVIRONMENT="production",
            SECRET_KEY="replace-me-in-production-with-a-long-random-secret",
            BACKEND_CORS_ORIGINS="https://doctorphysio.example",
        )


def test_production_settings_require_long_secret_key() -> None:
    too_short_secret = "a" * (MIN_PRODUCTION_SECRET_KEY_LENGTH - 1)

    with pytest.raises(ValidationError):
        build_settings(
            ENVIRONMENT="production",
            SECRET_KEY=too_short_secret,
            BACKEND_CORS_ORIGINS="https://doctorphysio.example",
        )


def test_production_settings_reject_localhost_cors_origins() -> None:
    with pytest.raises(ValidationError):
        build_settings(
            ENVIRONMENT="production",
            SECRET_KEY="a" * MIN_PRODUCTION_SECRET_KEY_LENGTH,
            BACKEND_CORS_ORIGINS="http://localhost:3000",
        )


def test_production_settings_accept_explicit_non_local_origins() -> None:
    settings = build_settings(
        ENVIRONMENT="production",
        SECRET_KEY="a" * MIN_PRODUCTION_SECRET_KEY_LENGTH,
        BACKEND_CORS_ORIGINS="https://doctorphysio.example,https://admin.doctorphysio.example",
    )

    assert settings.BACKEND_CORS_ORIGINS == [
        "https://doctorphysio.example",
        "https://admin.doctorphysio.example",
    ]
