from enum import Enum
from pydantic import BaseModel

class FactCheckStatus(str, Enum):
    TRUE = "true"
    FALSE = "false"
    MIXED = "mixed"
    UNVERIFIABLE = "unverifiable"

class AnalysisResponse(BaseModel):
    credibility_score: float
    fact_check_status: FactCheckStatus
    explanation: str