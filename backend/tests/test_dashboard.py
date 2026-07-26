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