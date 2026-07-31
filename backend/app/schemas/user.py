from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "full_name": "vyom",
                "email": "vyom@example.com",
                "password": "StrongPassword123"
            }
        }
    )


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    is_active: bool
    is_verified: bool

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "full_name": "Vyom Garg",
                "email": "vyom@example.com",
                "is_active": True,
                "is_verified": False
            }
        }
    )


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "email": "vyom@example.com",
                "password": "StrongPassword123"
            }
        }
    )


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer"
            }
        }
    )