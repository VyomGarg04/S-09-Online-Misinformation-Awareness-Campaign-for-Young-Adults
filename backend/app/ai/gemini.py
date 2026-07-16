from app.ai.prompts import FACT_CHECKER_PROMPT
import google.generativeai as genai

from app.core.config import settings

API_KEY = settings.gemini_api_key
genai.configure(api_key = API_KEY)

client = genai.GenerativeModel("gemini-1.5-flash")

def analyze(claim: str) -> str:
    full_prompt = f"{FACT_CHECKER_PROMPT}\n\nClaim: {claim}"
    response = client.generate_content(full_prompt)
    return response.text
