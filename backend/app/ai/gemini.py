from google import genai

from app.ai.prompts import FACT_CHECKER_PROMPT
from app.core.config import settings

client = genai.Client(api_key=settings.gemini_api_key)


def analyze(claim: str) -> str:
    full_prompt = f"{FACT_CHECKER_PROMPT}\n\nClaim:\n{claim}"

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
        )
        print(response.text)
        return response.text

    except Exception as e:
        raise RuntimeError(f"Gemini analysis failed: {e}")