from __future__ import annotations

from unittest.mock import AsyncMock

import pytest

from app.main import app
from app.redis import client as redis_client_module


@pytest.mark.anyio
async def test_ping_redis_uses_configured_client() -> None:
    original_client = redis_client_module.redis_client
    mock_client = AsyncMock()
    mock_client.ping.return_value = True
    redis_client_module.redis_client = mock_client

    try:
        result = await redis_client_module.ping_redis()
    finally:
        redis_client_module.redis_client = original_client

    assert result is True
    mock_client.ping.assert_awaited_once()


@pytest.mark.anyio
async def test_close_redis_client_closes_configured_client() -> None:
    original_client = redis_client_module.redis_client
    mock_client = AsyncMock()
    redis_client_module.redis_client = mock_client

    try:
        await redis_client_module.close_redis_client()
    finally:
        redis_client_module.redis_client = original_client

    mock_client.aclose.assert_awaited_once()


@pytest.mark.anyio
async def test_lifespan_tolerates_temporary_redis_ping_failure(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    close_mock = AsyncMock()

    async def failing_ping() -> bool:
        raise RuntimeError("Redis temporarily unavailable")

    monkeypatch.setattr("app.main.ping_redis", failing_ping)
    monkeypatch.setattr("app.main.close_redis_client", close_mock)

    async with app.router.lifespan_context(app):
        pass

    close_mock.assert_awaited_once()


@pytest.mark.anyio
async def test_lifespan_pings_redis_and_closes_client(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    ping_mock = AsyncMock(return_value=True)
    close_mock = AsyncMock()

    monkeypatch.setattr("app.main.ping_redis", ping_mock)
    monkeypatch.setattr("app.main.close_redis_client", close_mock)

    async with app.router.lifespan_context(app):
        pass

    ping_mock.assert_awaited_once()
    close_mock.assert_awaited_once()
