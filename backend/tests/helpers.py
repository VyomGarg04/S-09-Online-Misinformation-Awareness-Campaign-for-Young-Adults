from fastapi.testclient import TestClient

USER_PAYLOAD = {
    "full_name": "Vyom Garg",
    "email": "vyom@example.com",
    "password": "Password123",
}


CONTENT_PAYLOAD = {
    "title": "Fake News",
    "content": "Some misleading news content.",
    "content_type": "NEWS",
    "author": "John Doe",
    "source": "WhatsApp",
    "theme": "Politics",
    "subtheme": "Election",
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


def register_and_login_as(client, full_name, email, password):
    client.post(
        "/auth/register",
        json={
            "full_name": full_name,
            "email": email,
            "password": password,
        },
    )

    response = client.post(
        "/auth/login",
        data={
            "username": email,
            "password": password,
        },
    )

    return {
        "Authorization": f"Bearer {response.json()['access_token']}"
    }