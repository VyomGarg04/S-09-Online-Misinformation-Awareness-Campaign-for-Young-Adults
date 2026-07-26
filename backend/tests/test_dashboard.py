from tests.helpers import (
    register_and_login,
    CONTENT_PAYLOAD,
)

def test_dashboard_statistics_empty(client):
    response = client.get("/content/stats")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) == 0



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

    assert isinstance(data, list)
    assert len(data) > 0