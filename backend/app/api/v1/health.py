from fastapi import APIRouter

router = APIRouter()


@router.get(
    "/health",
    summary="Health check",
    description="Returns the current API health status.",
)
def health():
    return {
        "status": "healthy"
    }