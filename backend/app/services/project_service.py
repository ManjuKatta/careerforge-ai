def get_projects(missing_skills):

    projects = []

    if "Machine Learning" in missing_skills:
        projects.append(
            {
                "title": "House Price Prediction",
                "skill": "Machine Learning"
            }
        )

    if "Deep Learning" in missing_skills:
        projects.append(
            {
                "title": "Image Classification App",
                "skill": "Deep Learning"
            }
        )

    if "LLMs" in missing_skills:
        projects.append(
            {
                "title": "ChatGPT Clone",
                "skill": "LLMs"
            }
        )

    return projects