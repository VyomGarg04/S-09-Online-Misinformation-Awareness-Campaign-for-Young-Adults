from sqlalchemy.orm import Session

from app.database.models.content import Content
from sqlalchemy import select
from app.database.enums import (
    ContentType,
    FactCheckStatus,
)
def create_content(db: Session, content: Content) -> Content:
    db.add(content)
    db.commit()
    db.refresh(content)
    return content

def get_content_by_id(db: Session, content_id: int) -> Content | None:
    stmt = select(Content).where(Content.id == content_id)
    return db.execute(stmt).scalar_one_or_none()

def get_all_content(
        db: Session,
        page: int,
        page_size: int,
        theme: str | None = None,
        content_type: ContentType | None = None,
        status: FactCheckStatus | None = None,
        search: str | None = None,
    ) -> list[Content]:
    offset = (page - 1) * page_size
    stmt = select(Content)
    if theme:
        stmt = stmt.where(Content.theme == theme)

    if content_type:
        stmt = stmt.where(Content.content_type == content_type)

    if status:
        stmt = stmt.where(Content.fact_check_status == status)

    if search:
        stmt = stmt.where(
            Content.title.ilike(f"%{search}%")
        )
    
    offset = (page - 1) * page_size

    stmt = (
        stmt
        .offset(offset)
        .limit(page_size)
    )

    return db.execute(stmt).scalars().all()

def update_content(db: Session, content: Content) -> Content:
    db.commit()
    db.refresh(content)
    return content

def delete_content(db: Session, content: Content) -> None:
    db.delete(content)
    db.commit()