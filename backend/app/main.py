from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.core.config import settings
from app.redis.client import close_redis_client, ping_redis


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        await ping_redis()
    except Exception:
        # Allow the app to boot even when Redis is temporarily unavailable.
        pass

    yield

    await close_redis_client()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.API_V1_STR.removeprefix("/"),
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
async def root_health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(api_router, prefix=settings.API_V1_STR)
