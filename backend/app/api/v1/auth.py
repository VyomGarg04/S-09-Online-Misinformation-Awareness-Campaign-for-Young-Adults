from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user
from app.database.models.user import User
from app.dependencies.database import get_db
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    Token,
)
from app.services.auth_service import (
    register_user,
    login_user,
)
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register user",
    description="Creates a new user account.",
    responses={
        400: {"description": "Email already registered"},
    },
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    try:
        return register_user(db, user)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    

@router.post(
    "/login",
    response_model=Token,
    summary="Login",
    description="Authenticates a user and returns a JWT access token.",
    responses={
        401: {"description": "Invalid credentials"},
    },
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:
        user = UserLogin(
            email=form_data.username,
            password=form_data.password,
        )

        return login_user(db, user)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )
    

@router.get(
    "/me",
    response_model=UserResponse,
    summary="Current user",
    description="Returns the authenticated user's profile.",
    responses={
        401: {"description": "Unauthorized"},
    },
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user