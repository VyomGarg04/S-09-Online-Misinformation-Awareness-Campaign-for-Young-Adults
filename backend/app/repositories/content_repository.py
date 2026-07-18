from sqlalchemy.orm import Session

from app.database.models.content import Content
from sqlalchemy import select, func
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


def update_content_analysis(
    db: Session,
    content: Content,
    credibility_score: float,
    fact_check_status: FactCheckStatus,
    analysis_summary: str,
) -> Content:
    content.credibility_score = credibility_score
    content.fact_check_status = fact_check_status
    content.analysis_summary = analysis_summary

    db.commit()
    db.refresh(content)

    return content


def get_content_statistics(db: Session):
    total = db.scalar(
        select(func.count(Content.id))
    )

    stmt = (
        select(
            Content.fact_check_status,
            func.count(Content.id),
        )
        .group_by(Content.fact_check_status)
    )

    stats = db.execute(stmt).all()

    return total, stats


def get_dashboard_statistics(db: Session):
    return get_content_statistics(db)


def get_theme_statistics(db: Session):
    stmt = (
        select(
        Content.theme,
        func.count(Content.id),
    )
    .group_by(Content.theme)
    .order_by(func.count(Content.id).desc())
    )
    return db.execute(stmt).all()
