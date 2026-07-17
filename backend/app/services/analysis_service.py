from sqlalchemy.orm import Session

from app.repositories.content_repository import get_content_by_id
from app.ai.gemini import analyze
from app.ai.parser import parse_analysis_response
from app.schemas.analysis import AnalysisResponse

def analyze_content(
        db: Session,
        content_id: int,
    ) -> AnalysisResponse:
    content = get_content_by_id(db, content_id)

    if content is None:
        raise ValueError("Content not found")
    
    ai_response = analyze(content.content)
    analysis = parse_analysis_response(ai_response)

    return analysis