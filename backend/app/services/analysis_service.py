from sqlalchemy.orm import Session

from app.ai.gemini import analyze
from app.ai.parser import parse_analysis_response
from app.repositories.content_repository import (
    get_content_by_id,
    update_content_analysis,
)
from app.schemas.analysis import AnalysisResponse
from app.database.enums import FactCheckStatus

def analyze_content(
    db: Session,
    content_id: int,
) -> AnalysisResponse:
    content = get_content_by_id(db, content_id)

    if content is None:
        raise ValueError("Content not found")

    if (
        content.fact_check_status != FactCheckStatus.PENDING
        and content.analysis_summary is not None
    ):
        return AnalysisResponse(
            credibility_score=content.credibility_score,
            fact_check_status=content.fact_check_status,
            explanation=content.analysis_summary,
        )

    ai_response = analyze(content.content)
    analysis = parse_analysis_response(ai_response)

    update_content_analysis(
        db=db,
        content=content,
        credibility_score=analysis.credibility_score,
        fact_check_status=analysis.fact_check_status,
        analysis_summary=analysis.explanation,
    )

    return analysis