from fastapi import APIRouter

from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.doctors import router as doctors_router
from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.patients import router as patients_router
from app.api.v1.routes.services import router as services_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(doctors_router)
api_router.include_router(health_router, tags=["health"])
api_router.include_router(patients_router)
api_router.include_router(services_router)
