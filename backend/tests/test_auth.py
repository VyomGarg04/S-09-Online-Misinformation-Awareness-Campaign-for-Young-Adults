from sqlalchemy import select
from app.database.models.user import User
from app.security.hashing import verify_password 

# Arrange
USER_PAYLOAD = {
        "full_name": "Vyom Garg",
        "email": "vyom@example.com",
        "password": "Password123",
    }

def test_register_success(client, session):
    # Act
    response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    # Assert Response
    assert response.status_code == 201
    data = response.json()

    assert "password" not in data
    assert "hashed_password" not in data

    assert data["full_name"] == USER_PAYLOAD["full_name"]
    assert data["email"] == USER_PAYLOAD["email"]

    assert data["is_active"] is True
    assert data["is_verified"] is False

    assert "id" in data

    # Assert Database
    
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
    # Act
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

    stmt = select(User).where(User.email == USER_PAYLOAD["email"])
    users = session.execute(stmt).scalars().all()

    assert len(users) == 1
    assert data["detail"] == "Email already registered"


def test_login_success(client):
    # arrange
    response = client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    # act
    assert response.status_code == 201

    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": USER_PAYLOAD["password"],
        },
    )

    # assert
    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["access_token"] != ""


def test_login_invalid_password(client):
    # arrange
    response = client.post(
            "/auth/register",
            json=USER_PAYLOAD,
        )
    
    
    assert response.status_code == 201

    # act
    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": "WrongPassword123",
        },
    )

    # assert
    assert response.status_code == 401

    data = response.json()

    assert "detail" in data
    assert data["detail"] == "Invalid email or password"



def test_login_nonexistent_user(client):
    # Arrange
    # No user is registered.

    # act
    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": USER_PAYLOAD["password"],
        },
    )

    # assert
    assert response.status_code == 401

    data = response.json()

    assert "detail" in data
    assert data["detail"] == "Invalid email or password"