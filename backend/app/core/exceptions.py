class ContentNotFoundError(Exception):
    """Raised when the requested content does not exist."""
    pass


class AIAnalysisError(Exception):
    """Raised when AI analysis fails."""
    pass