import json

from app.schemas.analysis import AnalysisResponse
from app.database.enums import FactCheckStatus

def parse_analysis_response(response_text: str) -> AnalysisResponse:
    response_text = response_text.strip()

    if response_text.startswith("```"):
        response_text = response_text.replace("```json", "")
        response_text = response_text.replace("```", "")
        response_text = response_text.strip()

    try:
        data = json.loads(response_text)
    except json.JSONDecodeError as e:
        raise ValueError("Invalid AI response") from e    
    status = FactCheckStatus[
        data["fact_check_status"].upper()
    ]

    return AnalysisResponse(
        credibility_score=data["credibility_score"],
        fact_check_status=status,
        explanation=data["explanation"],
    )