from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float
from db import Base

class Studio(Base):
    __tablename__ = 'studios'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    studio_name = Column(String(50), unique=True)
    wallet = Column(Float, unique=False)
