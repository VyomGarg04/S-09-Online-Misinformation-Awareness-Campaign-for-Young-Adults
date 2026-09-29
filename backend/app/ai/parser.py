import json
import re

from app.schemas.analysis import AnalysisResponse
from app.database.enums import FactCheckStatus

def parse_analysis_response(response_text: str) -> AnalysisResponse:
    response_text = response_text.strip()

    # Extract JSON object from raw response text if surrounded by markdown or commentary
    json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
    if json_match:
        response_text = json_match.group(0)

    try:
        data = json.loads(response_text)
    except Exception as e:
        raise ValueError("Invalid AI response format") from e

    raw_status = str(data.get("fact_check_status", "UNVERIFIABLE")).upper()
    
    if any(k in raw_status for k in ["FALSE", "FAKE", "DEBUNKED", "INCORRECT"]):
        status = FactCheckStatus.FALSE
    elif any(k in raw_status for k in ["MISLEADING", "PARTIAL", "EXAGGERATED", "DECEPTIVE"]):
        status = FactCheckStatus.MISLEADING
    elif any(k in raw_status for k in ["VERIFIED", "TRUE", "AUTHENTIC", "ACCURATE"]):
        status = FactCheckStatus.VERIFIED
    else:
        status = FactCheckStatus.UNVERIFIABLE

    score = float(data.get("credibility_score", 50.0))
    score = max(0.0, min(100.0, score))
    explanation = data.get("explanation", "Automated analysis completed.")

    return AnalysisResponse(
        credibility_score=score,
        fact_check_status=status,
        explanation=explanation,
    )