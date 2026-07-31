from unittest.mock import patch

from tests.helpers import register_and_login, CONTENT_PAYLOAD

MOCK_AI_RESPONSE = """
{
    "credibility_score": 92.5,
    "fact_check_status": "VERIFIED",
    "explanation": "This claim is supported by reliable evidence."
}
"""