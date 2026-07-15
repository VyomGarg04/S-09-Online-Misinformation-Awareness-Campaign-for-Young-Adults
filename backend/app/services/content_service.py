from sqlalchemy.orm import Session

from app.database.models.content import Content
from app.repositories.content_repository import (
    create_content as create_content_repo,
    get_content_by_id,
    get_all_content,
    update_content as update_content_repo,
    delete_content as delete_content_repo,
)
from app.schemas.content import (
    ContentCreate,
    ContentUpdate,
)

from app.database.models.user import User

def create_content(db: Session,content_data: ContentCreate,owner: User) -> Content:
    content = Content(
        title = content_data.title,
        content = content_data.content,
        content_type = content_data.content_type,
        author = content_data.author,
        source = content_data.source,
        theme = content_data.theme,
        subtheme = content_data.subtheme,
        published_at = content_data.published_at,
        owner_id=owner.id
    )
    return create_content_repo(db, content)



def get_content(db: Session, content_id: int) -> Content:
    content = get_content_by_id(db, content_id)
    if not content:
        raise ValueError("Content not found")
    return content


def list_content(db: Session) -> list[Content]:
    return get_all_content(db)


def update_content(
        db: Session,
        content_id: int,
        content_data: ContentUpdate
    ) -> Content:
    content = get_content(db, content_id)
    if not content:
        raise ValueError("Content not found")
    updates = content_data.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(content, field, value)
    return update_content_repo(db, content)


def delete_content(
        db: Session,
        content_id: int,
    ) -> None:
    content = get_content(db, content_id)

    if not content:
        raise ValueError("Content not found")
    delete_content_repo(db, content)