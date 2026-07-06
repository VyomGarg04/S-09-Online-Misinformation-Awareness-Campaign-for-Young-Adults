from fastapi import FastAPI

app = FastAPI(
    title="MediaShield API",
    description="Backend API for the MediaShield platform.",
    version="0.1.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to MediaShield API!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }