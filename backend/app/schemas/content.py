from pydantic import BaseModel, ConfigDict, EmailStr
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

#response from the api
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

    model_config = ConfigDict(from_attributes=True)

class ContentUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    author: str | None = None
    source: str | None = None
    theme: str | None = None
    subtheme: str | None = None

