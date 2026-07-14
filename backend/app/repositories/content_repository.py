from sqlalchemy.orm import Session

from app.database.models.content import Content
from sqlalchemy import select

def create_content(db: Session, content: Content) -> Content:
    db.add(content)
    db.commit()
    db.refresh(content)
    return content

def get_content_by_id(db: Session, content_id: int) -> Content | None:
    stmt = select(Content).where(Content.id == content_id)
    return db.execute(stmt).scalar_one_or_none()

def get_all_content(db: Session) -> list[Content]:
    stmt = select(Content)
    return db.execute(stmt).scalars().all()

def update_content(db: Session, content: Content) -> Content:
    db.commit()
    db.refresh(content)
    return content

def delete_content(db: Session, content: Content) -> None:
    db.delete(content)
    db.commit()