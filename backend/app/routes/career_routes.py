from fastapi import APIRouter
from app.services.career_service import (
    get_skills,
    calculate_skill_gap,
    generate_roadmap,
    save_analysis,
    get_analysis_history
)
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.dependencies import get_db
router = APIRouter(
    prefix="/career",
    tags=["Career"]
)
from app.models.user_model import CareerAnalysisRequest

@router.get("/skills/{role}")
def get_role_skills(role: str):

    required_skills = get_skills(role)

    return {
        "role": role,
        "required_skills": required_skills
    }
@router.post("/skill-gap")
def skill_gap_analysis(data: dict):

    role = data["role"]
    current_skills = data["current_skills"]

    missing_skills = calculate_skill_gap(
        role,
        current_skills
    )

    return {
        "role": role,
        "current_skills": current_skills,
        "missing_skills": missing_skills
    }
@router.post("/roadmap")
def roadmap(data: dict):

    missing_skills = data["missing_skills"]

    roadmap = generate_roadmap(
        missing_skills
    )

    return {
        "roadmap": roadmap
    }
@router.post("/analyze")
def analyze_career(
    data: CareerAnalysisRequest,
    db: Session = Depends(get_db)
):

    role = data.role
    current_skills = data.current_skills
    user_id = data.user_id

    required_skills = get_skills(role)

    missing_skills = calculate_skill_gap(
        role,
        current_skills
    )

    roadmap = generate_roadmap(
        missing_skills
    )
    required_count = len(required_skills)

    matched_count = (
    required_count - len(missing_skills)
)

    readiness_score = (
    matched_count / required_count
) * 100
    save_analysis(
    db,
    user_id,
    role,
    readiness_score,
    missing_skills
)
    return {
        "role": role,
        "required_skills": required_skills,
        "missing_skills": missing_skills,
        "roadmap": roadmap,
        "readiness_score": round(readiness_score, 2),
    }
@router.post("/readiness-score")
def readiness_score(data: dict):

    role = data["role"]
    current_skills = data["current_skills"]

    skills_data = {
        "AI Engineer": [
            "Python",
            "SQL",
            "Machine Learning",
            "Deep Learning",
            "LLMs"
        ],

        "Data Analyst": [
            "Python",
            "SQL",
            "Excel",
            "Power BI",
            "Statistics"
        ],

        "ML Engineer": [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "MLOps",
            "Docker"
        ]
    }

    required_skills = skills_data.get(role, [])

    matched_skills = [
        skill
        for skill in current_skills
        if skill in required_skills
    ]

    score = (
        len(matched_skills)
        / len(required_skills)
    ) * 100

    return {
        "role": role,
        "readiness_score": round(score, 2)
    }

@router.get("/history/{user_id}")
def history(
    user_id: int,
    db: Session = Depends(get_db)
):

    analyses = get_analysis_history(
        db,
        user_id
    )

    return analyses
@router.get("/latest/{user_id}")
def latest_analysis(
    user_id: int,
    db: Session = Depends(get_db)
):

    analyses = get_analysis_history(
        db,
        user_id
    )

    if not analyses:
        return None

    return analyses[-1]
