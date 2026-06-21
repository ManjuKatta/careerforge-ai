print("db.py started")
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,text
from app.models.base import Base
from app.models.user_table import UserTable
from app.models.career_analysis_table import CareerAnalysisTable
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)
Base.metadata.create_all(bind=engine)
try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Database Connected Successfully!")
except Exception as e:
    print("Connection Error:", e)