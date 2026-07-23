from sqlalchemy import select
from app.database.models.user import User
from app.security import verify_password 


def test_register_success(client, session):
    # Arrange
    payload = {
        "full_name": "Vyom Garg",
        "email": "vyom@example.com",
        "password": "Password123",
    }

    # Act
    response = client.post(
        "/auth/register",
        json=payload,
    )

    # Assert Response
    assert response.status_code == 201
    data = response.json()

    assert "password" not in data
    assert "hashed_password" not in data

    assert data["full_name"] == payload["full_name"]
    assert data["email"] == payload["email"]

    assert data["is_active"] is True
    assert data["is_verified"] is False

    assert "id" in data

    # Assert Database
    
    stmt = select(User).where(User.email == payload["email"])
    user = session.execute(stmt).scalar_one_or_none()


    assert user is not None
    assert user.full_name == payload["full_name"]
    assert user.email == payload["email"]
    assert user.is_active is True
    assert user.is_verified is False
    assert verify_password(
        payload["password"],
        user.hashed_password,
    )