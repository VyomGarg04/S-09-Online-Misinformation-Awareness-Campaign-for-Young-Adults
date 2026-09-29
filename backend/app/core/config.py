import os
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "MediaShield"
    app_version: str = "0.1.0"
    debug: bool = False

    database_url: str = "sqlite:///./sql_app.db"

    secret_key: str = "mediashield-production-stable-jwt-secret-key-2026-v1"
    algorithm: str = "HS256"

    access_token_expire_minutes: int = 11520

    gemini_api_key: str = ""

    @field_validator("database_url", mode="before")
    def assemble_db_connection(cls, v: str) -> str:
        if isinstance(v, str) and v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql://", 1)
        return v
    
    model_config = SettingsConfigDict(
        env_file=os.getenv("ENV_FILE", ".env"),
        extra="ignore",
    )


settings = Settings()