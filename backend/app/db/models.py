# models.py

from sqlalchemy import Column, Integer, String
from app.db.database import Base

# Модель пользователя

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
