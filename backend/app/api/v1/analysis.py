from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.database import get_db

from app.schemas.analysis import AnalysisResponse

from app.services.analysis_service import (
    analyze_content,
    reanalyze_content,
)

router = APIRouter(prefix="/ai", tags=["AI"])



@router.post("/{content_id}")
def analyze_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
):
    return analyze_content(
        db=db,
        content_id=content_id,
    )
    
@router.post("/{content_id}/reanalyze")
def reanalyze_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
):
    return reanalyze_content(
        db=db,
        content_id=content_id,
    )