from fastapi import APIRouter
from app.models.user_model import User,UserResponse
from app.database.session import SessionLocal
from app.models.user_table import UserTable
from sqlalchemy.exc import IntegrityError
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
router = APIRouter()


@router.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(UserTable).all()

    return users

@router.post("/users")
def create_user(
    user: User,
    db: Session = Depends(get_db)
):

    

    new_user = UserTable(
        name=user.name,
        email=user.email,
        target_role=user.target_role
    )

    try:
        db.add(new_user)
        db.commit()

        return {
            "message": "User saved successfully"
        }

    except IntegrityError:
        db.rollback()

        return {
            "message": "Email already exists"
        }
@router.put("/users/{user_id}")
def update_user(
    user_id: int,
    user: User,
    db: Session = Depends(get_db)
):

    

    existing_user = db.query(UserTable).filter(
        UserTable.id == user_id
    ).first()

    if not existing_user:
        return {"message": "User not found"}

    existing_user.name = user.name
    existing_user.email = user.email
    existing_user.target_role = user.target_role

    db.commit()

    return {
        "message": "User updated successfully"
    }
@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    

    user = db.query(UserTable).filter(
        UserTable.id == user_id
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }
@router.get("/users/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(UserTable)
        .filter(UserTable.id == user_id)
        .first()
    )

    if not user:
        return {
            "message": "User not found"
        }

    return user