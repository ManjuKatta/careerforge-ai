import fitz

from app.services.career_service import (
    get_skills,
    calculate_skill_gap
)

from app.services.project_service import (
    get_projects
)


def extract_resume_text(file_path):

    doc = fitz.open(file_path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


def analyze_resume(
    file_path,
    role
):

    text = extract_resume_text(
        file_path
    )

    text_lower = text.lower()

    detected_skills = []

    required_skills = get_skills(role)

    for skill in required_skills:

        if skill.lower() in text_lower:

            detected_skills.append(skill)

    missing_skills = calculate_skill_gap(
        role,
        detected_skills
    )

    readiness_score = (
        (
            len(required_skills)
            - len(missing_skills)
        )
        / len(required_skills)
    ) * 100

    projects = get_projects(
        missing_skills
    )

    return {
        "role": role,
        "detected_skills": detected_skills,
        "missing_skills": missing_skills,
        "readiness_score": round(
            readiness_score,
            2
        ),
        "recommended_projects": projects
    }