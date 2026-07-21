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
    try:
        return analyze_content(
            db,
            content_id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    except RuntimeError as r:
        raise HTTPException(
            status_code=500,
            detail=str(r),
        )
    
@router.post("/{content_id}/reanalyze")
def reanalyze_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
):
    try:
        return reanalyze_content(
            db=db,
            content_id=content_id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except RuntimeError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )