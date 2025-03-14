from datetime import timedelta

from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session

from app.api.models.user import User
from app.core.security import verify_password, ACCESS_TOKEN_EXPIRE_MINUTES, create_jwt_token
from app.db import crud
from app.db.database import get_db

user_router = APIRouter(prefix="/auth")


@user_router.post("/register/")
async def register_user(user: User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    crud.create_user(db, user.username, user.password)
    return {"msg": "User registered successfully"}


@user_router.post("/login")
async def login_user(user: User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_jwt_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return access_token
