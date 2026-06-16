from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.user import Token, UserCreate, UserLogin, UserRead
from app.services.auth_service import authenticate_user, register_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)) -> UserRead:
    user = register_user(db, payload)
    return UserRead.model_validate(user)


@router.post("/login", response_model=Token)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> Token:
    return authenticate_user(db, payload)


@router.get("/me", response_model=UserRead)
def me(current_user: User = Depends(get_current_active_user)) -> UserRead:
    return UserRead.model_validate(current_user)
