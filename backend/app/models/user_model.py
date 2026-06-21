from pydantic import BaseModel,EmailStr, Field


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


class UserRegister(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    target_role: str = Field(..., min_length=2)

class UserLogin(BaseModel):
    email: str
    password: str