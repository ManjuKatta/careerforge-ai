from app.models.career_analysis_table import CareerAnalysisTable

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


def get_skills(role: str):
    return skills_data.get(role, [])


def calculate_skill_gap(
    role: str,
    current_skills: list
):

    required_skills = get_skills(role)

    current_skills_lower = [
        skill.strip().lower()
        for skill in current_skills
    ]

    missing_skills = [
        skill
        for skill in required_skills
        if skill.lower()
        not in current_skills_lower
    ]

    return missing_skills


def generate_roadmap(
    missing_skills: list
):

    roadmap = []

    week = 1

    for skill in missing_skills:

        roadmap.append(
            {
                "week": week,
                "task": f"Learn {skill}"
            }
        )

        week += 1

    return roadmap


def save_analysis(
    db,
    user_id,
    role,
    readiness_score,
    missing_skills
):

    analysis = CareerAnalysisTable(
        user_id=user_id,
        target_role=role,
        readiness_score=readiness_score,
        missing_skills=", ".join(missing_skills)
    )

    db.add(analysis)
    db.commit()

    return analysis


def get_analysis_history(
    db,
    user_id
):

    return (
        db.query(CareerAnalysisTable)
        .filter(
            CareerAnalysisTable.user_id == user_id
        )
        .all()
    )