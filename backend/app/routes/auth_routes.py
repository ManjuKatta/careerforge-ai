from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user_model import UserRegister
from app.models.user_table import UserTable
from app.services.security_service import hash_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(UserTable)
        .filter(UserTable.email == user.email)
        .first()
    )

    if existing_user:
        return {
            "message": "Email already exists"
        }

    hashed_password = hash_password(
        user.password
    )

    new_user = UserTable(
        name=user.name,
        email=user.email,
        password=hashed_password,
        target_role=user.target_role
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User registered successfully"
    }