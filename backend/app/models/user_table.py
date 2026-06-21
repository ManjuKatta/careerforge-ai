from sqlalchemy import Column, Integer, String
from app.models.base import Base


class UserTable(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(
        String,
        unique=True
    )

    password = Column(String)

    target_role = Column(String)