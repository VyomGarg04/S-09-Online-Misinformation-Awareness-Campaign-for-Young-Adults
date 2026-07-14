from enum import Enum


class ContentType(str, Enum):
    NEWS = "NEWS"
    BLOG = "BLOG"
    SOCIAL_POST = "SOCIAL_POST"
    WHATSAPP_FORWARD = "WHATSAPP_FORWARD"
    VIDEO_TRANSCRIPT = "VIDEO_TRANSCRIPT"
    X_POST = "X_POST"


class FactCheckStatus(str, Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    MISLEADING = "MISLEADING"
    FALSE = "FALSE"