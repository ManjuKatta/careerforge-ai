from jose import jwt, JWTError

from app.services.jwt_service import (
    SECRET_KEY,
    ALGORITHM
)

def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        return None