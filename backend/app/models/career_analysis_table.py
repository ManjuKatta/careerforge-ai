from sqlalchemy import Column, Integer, String, Float
from app.models.base import Base
from sqlalchemy import DateTime
from datetime import datetime

class CareerAnalysisTable(Base):
    __tablename__ = "career_analysis"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    target_role = Column(String)

    readiness_score = Column(Float)

    missing_skills = Column(String)
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )