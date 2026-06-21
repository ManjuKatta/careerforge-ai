from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.auth_dependency import (
    get_current_user
)
from app.database.dependencies import get_db
from app.models.user_table import UserTable
from app.models.user_model import (
    UserRegister,
    UserLogin
)

from app.services.security_service import (
    hash_password,
    verify_password
)
from app.services.jwt_service import (
    create_access_token
)
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
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(UserTable)
        .filter(UserTable.email == user.email)
        .first()
    )

    if not existing_user:
        return {
            "message": "Invalid email"
        }

    valid_password = verify_password(
        user.password,
        existing_user.password
    )

    if not valid_password:
        return {
            "message": "Invalid password"
        }

    token = create_access_token(
    {
        "user_id": existing_user.id,
        "email": existing_user.email
    })

    return {
    "access_token": token,
    "token_type": "bearer",
    "user_id": existing_user.id,
    "name": existing_user.name
    }
@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return current_user