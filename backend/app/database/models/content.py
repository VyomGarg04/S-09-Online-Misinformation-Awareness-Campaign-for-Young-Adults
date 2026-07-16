from __future__ import annotations

from typing import TYPE_CHECKING

from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    Float,
    DateTime,
    Enum,
    ForeignKey,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.base import Base
from app.database.enums import (
    ContentType,
    FactCheckStatus,
)
from pydantic import BaseModel


if TYPE_CHECKING:
    from app.database.models.user import User

class Content(Base):
    __tablename__ = "contents"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(
        String(255),
        index=True
    )
    content: Mapped[str] = mapped_column(Text)
    content_type: Mapped[ContentType] = mapped_column(
        Enum(ContentType),
        index=True
    )
    author: Mapped[str | None] = mapped_column(String(255), nullable=True)
    source: Mapped[str | None] = mapped_column(String(255), nullable=True)
    theme: Mapped[str | None] = mapped_column(String(255), nullable=True)
    subtheme: Mapped[str | None] = mapped_column(String(255), nullable=True)
    published_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
    )
    fact_check_status: Mapped[FactCheckStatus] = mapped_column(
        Enum(FactCheckStatus),
        default=FactCheckStatus.PENDING,
    )
    credibility_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now,
        onupdate=datetime.now,
    )
    owner_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )
    owner: Mapped["User"] = relationship(
        back_populates="contents",
    )

class DashboardStatistics(BaseModel):
    total_content: int
    pending: int
    verified: int
    misleading: int
    false: int

class ThemeStatistic(BaseModel):
    theme: str
    count: int