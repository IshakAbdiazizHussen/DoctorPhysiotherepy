from functools import lru_cache
from pathlib import Path
from typing import Annotated, Literal

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BACKEND_DIR / ".env"
PLACEHOLDER_SECRET_KEYS = {
    "change-this-secret-key",
    "replace-me-in-production-with-a-long-random-secret",
}
LOCALHOST_CORS_HOSTS = ("localhost", "127.0.0.1", "0.0.0.0")
MIN_PRODUCTION_SECRET_KEY_LENGTH = 32


class Settings(BaseSettings):
    PROJECT_NAME: str = "DoctorPhysio API"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: Literal["development", "staging", "production"]
    DATABASE_URL: str
    REDIS_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(gt=0)
    BACKEND_CORS_ORIGINS: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
    )

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            origins = [origin.strip().rstrip("/") for origin in value.split(",") if origin.strip()]
        else:
            origins = [origin.strip().rstrip("/") for origin in value if origin.strip()]

        if "*" in origins:
            raise ValueError("BACKEND_CORS_ORIGINS cannot contain '*'.")

        return origins

    @field_validator("SECRET_KEY")
    @classmethod
    def validate_secret_key_not_blank(cls, value: str) -> str:
        normalized_value = value.strip()
        if not normalized_value:
            raise ValueError("SECRET_KEY must not be blank.")
        return normalized_value

    @model_validator(mode="after")
    def validate_production_readiness(self) -> "Settings":
        if self.ENVIRONMENT != "production":
            return self

        if self.SECRET_KEY in PLACEHOLDER_SECRET_KEYS:
            raise ValueError("Production SECRET_KEY must not use a placeholder value.")

        if len(self.SECRET_KEY) < MIN_PRODUCTION_SECRET_KEY_LENGTH:
            raise ValueError(
                f"Production SECRET_KEY must be at least {MIN_PRODUCTION_SECRET_KEY_LENGTH} characters long."
            )

        if not self.BACKEND_CORS_ORIGINS:
            raise ValueError("Production BACKEND_CORS_ORIGINS must include at least one explicit origin.")

        localhost_origins = [
            origin
            for origin in self.BACKEND_CORS_ORIGINS
            if any(host in origin for host in LOCALHOST_CORS_HOSTS)
        ]
        if localhost_origins:
            raise ValueError(
                "Production BACKEND_CORS_ORIGINS must not include localhost-style origins."
            )

        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
