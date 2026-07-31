from app.database.enums import FactCheckStatus
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class AnalysisResponse(BaseModel):
    credibility_score: float
    fact_check_status: FactCheckStatus
    explanation: str
    analyzed_at: datetime | None = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "credibility_score": 92.5,
                "fact_check_status": "VERIFIED",
                "explanation": "This claim is supported by reliable evidence.",
                "analyzed_at": "2026-07-31T10:30:00"
            }
        }
    )