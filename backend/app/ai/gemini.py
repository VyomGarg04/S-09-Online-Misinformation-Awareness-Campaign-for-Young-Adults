import google.generativeai as genai

from app.core.config import settings

API_KEY = settings.gemini_api_key
genai.configure(api_key = API_KEY)

client = genai.GenerativeModel("gemini-1.5-flash")

def analyze(prompt: str) -> str:
#    send prompt
    response = client.generate_content(prompt)
    return response.text
