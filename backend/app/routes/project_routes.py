from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.services.project_service import get_projects
from app.services.career_service import get_analysis_history

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.get("/user/{user_id}")
def user_projects(
    user_id: int,
    db: Session = Depends(get_db)
):

    history = get_analysis_history(
        db,
        user_id
    )

    if not history:
        return []

    latest = history[-1]

    missing_skills = (
        latest.missing_skills
        .split(", ")
    )

    return get_projects(
        missing_skills
    )