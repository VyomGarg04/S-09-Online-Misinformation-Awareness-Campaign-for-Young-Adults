from sqlalchemy.orm import Session

from app.ai.gemini import analyze
from app.ai.parser import parse_analysis_response
from app.database.enums import FactCheckStatus
from app.database.models.content import Content
from app.repositories.content_repository import (
    get_content_by_id,
    update_content_analysis,
)
from app.schemas.analysis import AnalysisResponse


def perform_analysis(
    db: Session,
    content: Content,
) -> AnalysisResponse:

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

    return perform_analysis(db, content)


def reanalyze_content(
    db: Session,
    content_id: int,
) -> AnalysisResponse:

    content = get_content_by_id(db, content_id)

    if content is None:
        raise ValueError("Content not found")

    return perform_analysis(db, content)