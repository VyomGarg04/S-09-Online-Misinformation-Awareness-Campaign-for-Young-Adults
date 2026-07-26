from sqlalchemy import select

from app.database.models.user import User
from app.database.models.content import Content

USER_PAYLOAD = {
    "full_name": "Vyom Garg",
    "email": "vyom@example.com",
    "password": "Password123",
}


CONTENT_PAYLOAD = {
    "title": "Fake News",
    "content": "Some misleading news content.",
    "content_type": "ARTICLE",
    "author": "John Doe",
    "source": "WhatsApp",
    "theme": "Politics",
    "subtheme": "Election",
}


def register_and_login(client):
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
    assert response.status_code == 200

    token = response.json()["access_token"]

    return {
        "Authorization": f"Bearer {token}"
    }


def test_create_content_success(client, session):
    headers = register_and_login(client)

    response = client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()


    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data

    assert data["fact_check_status"] == "PENDING"
    assert data["credibility_score"] is None
    assert data["analysis_summary"] is None

    assert data["title"] == CONTENT_PAYLOAD["title"]
    assert data["content"] == CONTENT_PAYLOAD["content"]
    assert data["content_type"] == CONTENT_PAYLOAD["content_type"]
    assert data["author"] == CONTENT_PAYLOAD["author"]
    assert data["source"] == CONTENT_PAYLOAD["source"]
    assert data["theme"] == CONTENT_PAYLOAD["theme"]
    assert data["subtheme"] == CONTENT_PAYLOAD["subtheme"]

    stmt = select(Content).where(
        Content.title == CONTENT_PAYLOAD["title"]
    )

    content = session.execute(stmt).scalar_one_or_none()

    assert content is not None
    assert content.title == CONTENT_PAYLOAD["title"]
    stmt = select(User).where(User.email == USER_PAYLOAD["email"])
    user = session.execute(stmt).scalar_one()

    assert content.owner_id == user.id


def test_create_content_unauthorized(client):
    response = client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
    )

    assert response.status_code == 401

    data = response.json()

    assert "detail" in data



def test_list_content(client):
    headers = register_and_login(client)

    client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    second_content = CONTENT_PAYLOAD.copy()
    second_content["title"] = "Second Article"

    client.post(
        "/content/",
        json=second_content,
        headers=headers,
    )

    response = client.get("/content/")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) == 2

    titles = [item["title"] for item in data]

    assert CONTENT_PAYLOAD["title"] in titles
    assert second_content["title"] in titles


def test_get_content_success(client):
    headers = register_and_login(client)

    response = client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    content_id = response.json()["id"]

    response = client.get(f"/content/{content_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == content_id
    assert data["title"] == CONTENT_PAYLOAD["title"]
    assert data["content"] == CONTENT_PAYLOAD["content"]
    assert data["theme"] == CONTENT_PAYLOAD["theme"]