from fastapi import APIRouter
from app.services.chat_service import (
    ask_career_mentor
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Mentor"]
)

@router.post("/")
def chat(data: dict):

    message = data["message"]

    reply = ask_career_mentor(
        message
    )

    return {
        "response": reply
    }