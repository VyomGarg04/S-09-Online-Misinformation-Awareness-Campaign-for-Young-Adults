from tests.helpers import (
    register_and_login,
    CONTENT_PAYLOAD,
)

def test_dashboard_statistics_empty(client):
    response = client.get("/content/stats")

    assert response.status_code == 200

    data = response.json()

    assert data["total_content"] == 0
    assert data["pending"] == 0
    assert data["verified"] == 0
    assert data["misleading"] == 0
    assert data["false"] == 0



def test_dashboard_statistics(client):
    headers = register_and_login(client)

    client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    second = CONTENT_PAYLOAD.copy()
    second["title"] = "Article 2"

    client.post(
        "/content/",
        json=second,
        headers=headers,
    )

    response = client.get("/content/stats")

    assert response.status_code == 200

    data = response.json()

    assert data["total_content"] == 2
    assert data["pending"] == 2
    assert data["verified"] == 0
    assert data["misleading"] == 0
    assert data["false"] == 0


def test_theme_statistics_empty(client):
    response = client.get("/content/themes")

    assert response.status_code == 200

    data = response.json()

    assert data == []


def test_theme_statistics(client):
    headers = register_and_login(client)

    client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    second = CONTENT_PAYLOAD.copy()
    second["title"] = "Second Article"

    client.post(
        "/content/",
        json=second,
        headers=headers,
    )

    response = client.get("/content/themes")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1

    theme = data[0]

    assert theme["theme"] == "Politics"
    assert theme["count"] == 2


def test_theme_statistics_multiple_themes(client):
    headers = register_and_login(client)

    client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    health = CONTENT_PAYLOAD.copy()
    health["title"] = "Health News"
    health["theme"] = "Health"

    client.post(
        "/content/",
        json=health,
        headers=headers,
    )

    response = client.get("/content/themes")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 2

    theme_counts = {
        item["theme"]: item["count"]
        for item in data
    }

    assert theme_counts["Politics"] == 1
    assert theme_counts["Health"] == 1