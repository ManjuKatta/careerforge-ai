from pydantic import BaseModel


class User(BaseModel):
    name: str
    email: str
    target_role: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    target_role: str

    class Config:
        from_attributes = True


class CareerAnalysisRequest(BaseModel):
    user_id: int
    role: str
    current_skills: list[str]