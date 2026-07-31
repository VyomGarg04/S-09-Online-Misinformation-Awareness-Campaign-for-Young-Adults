from unittest.mock import patch

from tests.helpers import register_and_login, CONTENT_PAYLOAD

MOCK_AI_RESPONSE = """
{
    "credibility_score": 92.5,
    "fact_check_status": "VERIFIED",
    "explanation": "This claim is supported by reliable evidence."
}
"""

@patch("app.services.analysis_service.analyze")
def test_ai_analysis(mock_analyze, client):
    mock_analyze.return_value = MOCK_AI_RESPONSE

    headers = register_and_login(client)

    response = client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    content_id = response.json()["id"]

    response = client.post(f"/ai/{content_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["credibility_score"] == 92.5
    assert data["fact_check_status"] == "VERIFIED"
    assert data["explanation"] == "This claim is supported by reliable evidence."

    mock_analyze.assert_called_once()


@patch("app.services.analysis_service.analyze")
def test_ai_analysis_cached(mock_analyze, client):
    mock_analyze.return_value = MOCK_AI_RESPONSE

    headers = register_and_login(client)

    response = client.post(
        "/content/",
        json=CONTENT_PAYLOAD,
        headers=headers,
    )

    content_id = response.json()["id"]

    client.post(f"/ai/{content_id}")

    mock_analyze.reset_mock()

    response = client.post(f"/ai/{content_id}")

    assert response.status_code == 200

    mock_analyze.assert_not_called()