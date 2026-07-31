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
    title="MediaShield API",
    version="1.0.0",
    summary="AI-powered misinformation detection platform",
    description="""
## MediaShield API

MediaShield is an AI-powered misinformation detection platform that helps users verify the credibility of online content.

### Features

- 🔐 JWT Authentication
- 📰 Content Management
- 🤖 Gemini AI Fact Checking
- 📊 Dashboard Statistics
- 📈 Theme-wise Analytics

This API is built using FastAPI and SQLAlchemy.
    """,
    contact={
        "name": "MediaShield Team",
        "url": "https://github.com/CSquareClub/S-09-Online-Misinformation-Awareness-Campaign-for-Young-Adults",
    },
    license_info={
        "name": "MIT License",
    },
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



