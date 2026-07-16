from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.services.analysis_service import analyze_content

from app.schemas.analysis import AnalysisResponse

router = APIRouter(prefix="/ai", tags=["AI"])



@router.post("/analysis/{content_id}", response_model=AnalysisResponse)

def analysis_content_endpoint():
    pass
