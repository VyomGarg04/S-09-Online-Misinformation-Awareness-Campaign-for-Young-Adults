from app.database.enums import FactCheckStatus
from pydantic import BaseModel
from datetime import datetime

class AnalysisResponse(BaseModel):
    credibility_score: float
    fact_check_status: FactCheckStatus
    explanation: str
    analyzed_at: datetime | None = None