from pydantic import BaseModel, ConfigDict
from app.database.enums import (
    ContentType,
    FactCheckStatus,
)
from datetime import datetime

class ContentCreate(BaseModel):
    title: str
    content: str
    content_type: ContentType
    author: str | None = None
    source: str | None = None
    theme: str | None = None
    subtheme: str | None = None
    published_at: datetime | None = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "title": "NASA announces Artemis mission",
                "content": "NASA has officially announced...",
                "content_type": "NEWS",
                "author": "John Doe",
                "source": "https://example.com",
                "theme": "Science",
                "subtheme": "Space",
                "published_at": "2026-07-31T10:30:00"
            }
        }
    )

# Response returned from API
class ContentResponse(BaseModel):
    id: int
    title: str
    content: str
    content_type: ContentType
    author: str | None
    source: str | None
    theme: str | None
    subtheme: str | None
    published_at: datetime | None
    created_at: datetime
    updated_at: datetime
    credibility_score: float | None
    fact_check_status: FactCheckStatus
    analysis_summary: str | None
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "title": "NASA announces Artemis mission",
                "content": "NASA has officially announced...",
                "content_type": "NEWS",
                "author": "John Doe",
                "source": "https://example.com",
                "theme": "Science",
                "subtheme": "Space",
                "published_at": "2026-07-31T10:30:00",
                "created_at": "2026-07-31T10:35:12",
                "updated_at": "2026-07-31T10:40:52",
                "credibility_score": 92.5,
                "fact_check_status": "VERIFIED",
                "analysis_summary": "The claim is supported by reliable evidence."
            }
        }
    )

class ContentUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    author: str | None = None
    source: str | None = None
    theme: str | None = None
    subtheme: str | None = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "title": "Updated title",
                "content": "Updated content"
            }
        }
    )

class DashboardStatistics(BaseModel):
    total_content: int
    pending: int
    verified: int
    misleading: int
    false: int

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "total_content": 120,
                "pending": 20,
                "verified": 70,
                "misleading": 20,
                "false": 10
            }
        }
    )

class ThemeStatistic(BaseModel):
    theme: str = "General"
    count: int

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "theme": "Science",
                "count": 18
            }
        }
    )