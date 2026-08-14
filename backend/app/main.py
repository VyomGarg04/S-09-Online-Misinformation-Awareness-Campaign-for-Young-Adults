from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.exceptions import (
    ContentNotFoundError,
    AIAnalysisError,
)

tags_metadata = [
    {
        "name": "Authentication",
        "description": "Register, login and manage authenticated users.",
    },
    {
        "name": "Content",
        "description": "Create, retrieve, update and delete content.",
    },
    {
        "name": "AI",
        "description": "Analyze content using the Gemini AI fact-checking engine.",
    },
    {
        "name": "Health",
        "description": "API health monitoring endpoints.",
    },
]

app = FastAPI(
    title="MediaShield API",
    version="1.0.0",
    summary="AI-powered misinformation detection platform",
    description="""
## MediaShield API

MediaShield is an AI-powered misinformation detection platform that helps users verify the credibility of online content.
    """,
    contact={
        "name": "MediaShield Team",
        "url": "https://github.com/CSquareClub/S-09-Online-Misinformation-Awareness-Campaign-for-Young-Adults",
    },
    license_info={
        "name": "MIT License",
    },
    openapi_tags=tags_metadata,
)

# Robust CORS middleware configuration supporting localhost, 127.0.0.1 & any dev port
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
