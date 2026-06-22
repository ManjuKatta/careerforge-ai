import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)
def ask_career_mentor(message: str):

    prompt = f"""
    You are CareerForge AI.

    Help users with:
    - Career guidance
    - AI Engineer roadmap
    - ML Engineer roadmap
    - Data Analyst roadmap
    - Skill development
    - Interview preparation

    User Question:
    {message}
    """

    response = model.generate_content(
        prompt
    )

    return response.text