from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from db import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True)
    password_hash = Column(String(128), unique=False)
    is_admin = Column(Boolean, unique=False, default=False)
    studio_fk = Column(Integer, ForeignKey('studios.id'))