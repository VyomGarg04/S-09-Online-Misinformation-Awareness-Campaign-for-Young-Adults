from fastapi.testclient import TestClient

USER_PAYLOAD = {
    "full_name": "Vyom Garg",
    "email": "vyom@example.com",
    "password": "Password123",
}


def register_and_login(client: TestClient):
    client.post(
        "/auth/register",
        json=USER_PAYLOAD,
    )

    response = client.post(
        "/auth/login",
        data={
            "username": USER_PAYLOAD["email"],
            "password": USER_PAYLOAD["password"],
        },
    )

    token = response.json()["access_token"]

    return {
        "Authorization": f"Bearer {token}"
    }