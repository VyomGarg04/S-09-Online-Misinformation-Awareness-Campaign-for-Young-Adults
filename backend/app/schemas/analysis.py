from app.database.enums import FactCheckStatus
from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    credibility_score: float
    fact_check_status: FactCheckStatus
    explanation: str