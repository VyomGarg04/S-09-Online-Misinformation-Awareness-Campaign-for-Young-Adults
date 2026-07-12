from sqlalchemy.orm import Session

from app.database.models.user import User
from app.repositories.user_repository import (
    create_user,
    get_user_by_email,
)
from app.schemas.user import (
    UserCreate,
    UserLogin,
    Token,
)

from app.security.hashing import (
    hash_password,
    verify_password,
)

from app.security.jwt import create_access_token


def register_user(db: Session, user_data: UserCreate) -> User:
    existing_user = get_user_by_email(db, user_data.email)

    if existing_user:
        raise ValueError("Email already registered")

    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    return create_user(db, user)


def login_user(db: Session, user_data: UserLogin) -> Token:
    user = get_user_by_email(db, user_data.email)

    if not user:
        raise ValueError("Invalid email or password")
    
    if not verify_password(
        user_data.password,
        user.hashed_password,
    ):
        raise ValueError("Invalid email or password")
    

    access_token = create_access_token(
        {
            "sub": user.email
        }
    )

    return Token(
        access_token=access_token
    )