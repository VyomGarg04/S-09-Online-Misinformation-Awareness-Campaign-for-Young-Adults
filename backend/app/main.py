from fastapi import FastAPI

from app.api.router import api_router
from app.core.config import settings

from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.exceptions import (
    ContentNotFoundError,
    AIAnalysisError,
)


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for MediaShield",
)

@app.exception_handler(ContentNotFoundError)
async def content_not_found_exception_handler(
    request: Request,
    exc: ContentNotFoundError,
):
    return JSONResponse(
        status_code=404,
        content={
            "detail": str(exc),
        },
    )

@app.exception_handler(AIAnalysisError)
async def ai_analysis_exception_handler(
    request: Request,
    exc: AIAnalysisError,
):
    return JSONResponse(
        status_code=500,
        content={
            "detail": str(exc),
        },
    )


app.include_router(api_router)