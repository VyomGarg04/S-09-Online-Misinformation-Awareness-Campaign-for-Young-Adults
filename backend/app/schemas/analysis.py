from app.database.enums import FactCheckStatus
from pydantic import BaseModel

class FactCheckStatus(str):
    TRUE = "true"
    FALSE = "false"
    MIXED = "mixed"
    UNVERIFIABLE = "unverifiable"

class AnalysisResponse(BaseModel):
    credibility_score: float
    fact_check_status: FactCheckStatus
    explanation: str