from jose import jwt
from sqlalchemy import select

from app.core.config import settings
from app.database.models.user import User
from app.security.hashing import verify_password


USER_PAYLOAD = {
    "full_name": "Vyom Garg",
    "email": "vyom@example.com",
    "password": "Password123",
}


def test_register_success(client, session):
    response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    assert response.status_code == 201

    data = response.json()

    assert "password" not in data
    assert "hashed_password" not in data

    assert data["full_name"] == USER_PAYLOAD["full_name"]
    assert data["email"] == USER_PAYLOAD["email"]
    assert data["is_active"] is True
    assert data["is_verified"] is False
    assert "id" in data

    stmt = select(User).where(User.email == USER_PAYLOAD["email"])
    user = session.execute(stmt).scalar_one_or_none()

    assert user is not None
    assert user.full_name == USER_PAYLOAD["full_name"]
    assert user.email == USER_PAYLOAD["email"]
    assert user.is_active is True
    assert user.is_verified is False

    assert verify_password(
        USER_PAYLOAD["password"],
        user.hashed_password,
    )


def test_register_duplicate_email(client, session):
    response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    assert response.status_code == 201

    response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    assert response.status_code == 400

    data = response.json()

    assert data["detail"] == "Email already registered"

    stmt = select(User).where(User.email == USER_PAYLOAD["email"])
    users = session.execute(stmt).scalars().all()

    assert len(users) == 1


def test_login_success(client):
    register_response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    assert register_response.status_code == 201

    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": USER_PAYLOAD["password"],
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["access_token"] != ""

    decoded = jwt.decode(
        data["access_token"],
        settings.secret_key,
        algorithms=[settings.algorithm],
    )

    assert decoded["sub"] == USER_PAYLOAD["email"]


def test_login_invalid_password(client):
    response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    assert response.status_code == 201

    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": "WrongPassword123",
        },
    )

    assert response.status_code == 401

    data = response.json()

    assert "detail" in data
    assert data["detail"] == "Invalid email or password"


def test_login_nonexistent_user(client):
    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": USER_PAYLOAD["password"],
        },
    )

    assert response.status_code == 401

    data = response.json()

    assert "detail" in data
    assert data["detail"] == "Invalid email or password"


def register_and_login(client):
    register_response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": USER_PAYLOAD["password"],
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    return {
        "Authorization": f"Bearer {token}"
    }


def test_get_current_user(client):
    headers = register_and_login(client)

    response = client.get(
        "/auth/me",
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["email"] == USER_PAYLOAD["email"]
    assert data["full_name"] == USER_PAYLOAD["full_name"]


def test_get_current_user_without_token(client):
    response = client.get("/auth/me")

    assert response.status_code == 401

    data = response.json()

    assert "detail" in data


def test_get_current_user_invalid_token(client):
    response = client.get(
        "/auth/me",
        headers={
            "Authorization": "Bearer invalid-token",
        },
    )

    assert response.status_code == 401

    data = response.json()

    assert "detail" in data