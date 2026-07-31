from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.database import get_db

from app.schemas.analysis import AnalysisResponse

from app.services.analysis_service import (
    analyze_content,
    reanalyze_content,
    ContentNotFoundError,
)

router = APIRouter(prefix="/ai", tags=["AI"])



@router.post(
    "/{content_id}", 
    response_model=AnalysisResponse,
    )
def analyze_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
):
    try:
        return analyze_content(
            db=db,
            content_id=content_id,
        )
    except ContentNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


    
@router.post(
    "/{content_id}/reanalyze",
    response_model=AnalysisResponse,
    summary="Reanalyze content",
    description="Forces a fresh AI analysis of a content item.",
    responses={
        404: {"description": "Content not found"},
        500: {"description": "Gemini analysis failed"},
    },
)
def reanalyze_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
):
    try:
        return reanalyze_content(
            db=db,
            content_id=content_id,
        )
    except ContentNotFoundError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))