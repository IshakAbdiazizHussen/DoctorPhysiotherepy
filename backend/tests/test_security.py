from __future__ import annotations

from datetime import timedelta

from app.core.security import (
    BCRYPT_PASSWORD_MAX_BYTES,
    TOKEN_SUBJECT_CLAIM,
    create_access_token,
    decode_access_token,
    hash_password,
    validate_password_bytes_length,
    verify_password,
)


def test_hash_password_changes_stored_value() -> None:
    password = "Secure123"

    hashed_password = hash_password(password)

    assert hashed_password != password
    assert hashed_password.startswith("$2")


def test_verify_password_accepts_correct_password_and_rejects_wrong_one() -> None:
    password = "Secure123"
    hashed_password = hash_password(password)

    assert verify_password(password, hashed_password) is True
    assert verify_password("WrongPassword123", hashed_password) is False


def test_verify_password_rejects_passwords_over_bcrypt_limit() -> None:
    hashed_password = hash_password("Secure123")
    overlong_password = ("a" * (BCRYPT_PASSWORD_MAX_BYTES - 1)) + "1b"

    assert verify_password(overlong_password, hashed_password) is False


def test_create_access_token_uses_subject_and_extra_claims() -> None:
    token = create_access_token("user-123", role="admin")
    payload = decode_access_token(token)

    assert payload is not None
    assert payload[TOKEN_SUBJECT_CLAIM] == "user-123"
    assert payload["role"] == "admin"
    assert "exp" in payload


def test_decode_access_token_rejects_invalid_token() -> None:
    assert decode_access_token("not-a-valid-token") is None


def test_decode_access_token_rejects_expired_token() -> None:
    token = create_access_token(
        "user-123",
        expires_delta=timedelta(seconds=-1),
    )

    assert decode_access_token(token) is None


def test_validate_password_bytes_length_allows_boundary_value() -> None:
    boundary_password = ("a" * (BCRYPT_PASSWORD_MAX_BYTES - 1)) + "1"

    assert validate_password_bytes_length(boundary_password) == boundary_password
