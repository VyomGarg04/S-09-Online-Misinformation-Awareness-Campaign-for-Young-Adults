import re
from sqlalchemy.orm import Session

from app.ai.gemini import analyze, fetch_url_metadata
from app.ai.parser import parse_analysis_response
from app.database.enums import FactCheckStatus
from app.database.models.content import Content
from app.repositories.content_repository import (
    get_content_by_id,
    update_content_analysis,
)
from app.schemas.analysis import AnalysisResponse
from app.core.exceptions import ContentNotFoundError


def perform_analysis(
    db: Session,
    content: Content,
) -> AnalysisResponse:
    # If content item has a URL or generic title, enrich it with live web page metadata
    url_to_fetch = content.source if content.source and content.source.startswith("http") else None
    if not url_to_fetch:
        urls = re.findall(r'https?://[^\s]+', content.content)
        if urls:
            url_to_fetch = urls[0]

    if url_to_fetch:
        meta = fetch_url_metadata(url_to_fetch)
        if meta.get("title"):
            if not content.title or content.title.startswith("Analysis of") or content.title.startswith("Article from"):
                content.title = meta["title"]
        if meta.get("description"):
            if content.content.startswith("URL submitted"):
                content.content = f"Article Summary ({url_to_fetch}): {meta['description']}"
        db.commit()

    ai_response = analyze(f"Title: {content.title}\nContent: {content.content}\nSource: {content.source or 'None'}")
    analysis = parse_analysis_response(ai_response)

    updated_content = update_content_analysis(
        db=db,
        content=content,
        credibility_score=analysis.credibility_score,
        fact_check_status=analysis.fact_check_status,
        analysis_summary=analysis.explanation,
    )

    return AnalysisResponse(
        credibility_score=updated_content.credibility_score,
        fact_check_status=updated_content.fact_check_status,
        explanation=updated_content.analysis_summary,
        analyzed_at=updated_content.analyzed_at,
    )


def analyze_content(
    db: Session,
    content_id: int,
) -> AnalysisResponse:

    content = get_content_by_id(db, content_id)

    if content is None:
        raise ContentNotFoundError("Content not found")

    if (
        content.fact_check_status != FactCheckStatus.PENDING
        and content.analysis_summary is not None
    ):
        return AnalysisResponse(
            credibility_score=content.credibility_score,
            fact_check_status=content.fact_check_status,
            explanation=content.analysis_summary,
            analyzed_at=content.analyzed_at,
        )

    return perform_analysis(db, content)


def reanalyze_content(
    db: Session,
    content_id: int,
) -> AnalysisResponse:

    content = get_content_by_id(db, content_id)

    if content is None:
        raise ContentNotFoundError("Content not found")

    return perform_analysis(db, content)