from fastapi import FastAPI

from app.api.router import api_router

app = FastAPI(
    title="MediaShield API",
    description="Backend API for the MediaShield platform.",
    version="0.1.0",
)

app.include_router(api_router)