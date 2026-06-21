from __future__ import annotations

import pytest

from app.core.security import BCRYPT_PASSWORD_MAX_BYTES
from app.models.user import UserRole
import app.utils.dev_seed as dev_seed


def test_seed_users_are_fake_local_development_accounts() -> None:
    seed_emails = {user.email for user in dev_seed.SEED_USERS}

    assert seed_emails == {
        "local.admin@example.com",
        "patient.one@example.com",
        "patient.two@example.com",
    }
    assert all(user.email.endswith("@example.com") for user in dev_seed.SEED_USERS)
    assert all(
        len(user.password.encode("utf-8")) <= BCRYPT_PASSWORD_MAX_BYTES
        for user in dev_seed.SEED_USERS
    )
    assert any(user.role == UserRole.ADMIN for user in dev_seed.SEED_USERS)
    assert any(user.role == UserRole.USER for user in dev_seed.SEED_USERS)


def test_development_environment_guard_rejects_non_development(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(dev_seed.settings, "ENVIRONMENT", "production")

    with pytest.raises(RuntimeError, match="ENVIRONMENT=development"):
        dev_seed.ensure_development_environment()
