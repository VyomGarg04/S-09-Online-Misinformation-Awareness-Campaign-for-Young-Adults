from sqlalchemy.orm import Session

from app.database.models.user import User
from app.repositories.user_repository import (
    create_user,
    get_user_by_email,
)
from app.schemas.user import UserCreate
from app.security.hashing import hash_password


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