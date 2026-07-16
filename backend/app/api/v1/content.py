from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.database.models.user import User

from app.schemas.content import (
    ContentCreate,
    ContentUpdate,
    ContentResponse,
)

from app.services.content_service import (
    create_content as create_content_service,
    get_content as get_content_service,
    list_content as list_content_service,
    update_content as update_content_service,
    delete_content as delete_content_service,
    get_dashboard_statistics as get_dashboard_statistics_service,
    get_theme_statistics as get_theme_statistics_service,
)
from app.database.enums import (
    ContentType,
    FactCheckStatus,
)
router = APIRouter(prefix="/content", tags=["Content"])



@router.post("/", response_model=ContentResponse)
def create_content_endpoint(
    content_data: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return create_content_service(
            db,
            content_data,
            current_user,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    




@router.get("/", response_model=list[ContentResponse])
def list_content_endpoint(
    page: int = 1,
    page_size: int = 10,
    theme: str | None = None,
    content_type: ContentType | None = None,
    status: FactCheckStatus | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    return list_content_service(
        db,
        page,
        page_size,
        theme,
        content_type,
        status,
        search,
    )

@router.get("/stats")
def get_dashboard_statistics_endpoint(
    db: Session = Depends(get_db),
):
    return get_dashboard_statistics_service(db)

@router.get("/{content_id}", response_model=ContentResponse)
def get_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
):
    try:
        return get_content_service(db, content_id)
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    





@router.put("/{content_id}", response_model=ContentResponse)
def update_content_endpoint_service(
    content_id: int,
    content_data: ContentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return update_content_service(
            db,
            content_id,
            content_data,
            current_user,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail = str(e)
        )
    except PermissionError as e:
        raise HTTPException(
        status_code=403,
        detail=str(e),
    )





@router.delete("/{content_id}")
def delete_content_endpoint(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        delete_content_service(
            db,
            content_id,
            current_user,
        )
        return {
            "message": "Content deleted successfully"
        }
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    except PermissionError as e:
        raise HTTPException(
        status_code=403,
        detail=str(e),
    )

