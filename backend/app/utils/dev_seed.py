from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.database.session import SessionLocal
from app.models.user import User, UserRole


@dataclass(frozen=True)
class SeedUserDefinition:
    full_name: str
    email: str
    password: str
    role: UserRole = UserRole.USER
    is_active: bool = True
    is_verified: bool = True


SEED_USERS: tuple[SeedUserDefinition, ...] = (
    SeedUserDefinition(
        full_name="Local Admin",
        email="local.admin@doctorphysio.test",
        password="Admin123",
        role=UserRole.ADMIN,
        is_active=True,
        is_verified=True,
    ),
    SeedUserDefinition(
        full_name="Sample Patient One",
        email="patient.one@doctorphysio.test",
        password="Patient123",
        role=UserRole.USER,
        is_active=True,
        is_verified=True,
    ),
    SeedUserDefinition(
        full_name="Sample Patient Two",
        email="patient.two@doctorphysio.test",
        password="Patient456",
        role=UserRole.USER,
        is_active=True,
        is_verified=False,
    ),
)


def ensure_development_environment() -> None:
    if settings.ENVIRONMENT != "development":
        raise RuntimeError(
            "Development seed script can run only when ENVIRONMENT=development."
        )


def _get_user_by_email(db: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    return db.scalar(statement)


def seed_users(db: Session) -> dict[str, int]:
    created_count = 0
    skipped_count = 0

    for seed_user in SEED_USERS:
        existing_user = _get_user_by_email(db, seed_user.email)
        if existing_user is not None:
            skipped_count += 1
            continue

        db.add(
            User(
                full_name=seed_user.full_name,
                email=seed_user.email,
                hashed_password=hash_password(seed_user.password),
                role=seed_user.role.value,
                is_active=seed_user.is_active,
                is_verified=seed_user.is_verified,
            )
        )
        created_count += 1

    db.commit()
    return {"created": created_count, "skipped": skipped_count}


def run() -> dict[str, int]:
    ensure_development_environment()

    with SessionLocal() as db:
        return seed_users(db)


if __name__ == "__main__":
    results = run()
    print(
        "Development seed complete: "
        f"{results['created']} users created, {results['skipped']} users skipped."
    )
