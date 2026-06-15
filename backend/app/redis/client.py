from redis.asyncio import Redis

from app.core.config import settings

redis_client = Redis.from_url(settings.REDIS_URL, decode_responses=True)


async def ping_redis() -> bool:
    return await redis_client.ping()


async def close_redis_client() -> None:
    await redis_client.aclose()
