import google.generativeai as genai
import json

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def generate_role_skills(role: str):

    prompt = f"""
    Give top 10 required skills for becoming a {role}.

    Return only JSON.

    Example:

    {{
      "skills": [
        "Python",
        "Machine Learning"
      ]
    }}
    """

    response = model.generate_content(prompt)

    return json.loads(response.text)