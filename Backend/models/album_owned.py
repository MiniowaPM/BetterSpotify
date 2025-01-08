from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from db import Base

class Albums_owned(Base):
    __tablename__ = 'albums_owned'
      
    id = Column(Integer, primary_key=True, index=True)
    album_fk = Column(Integer, ForeignKey('albums.id'))
    studio_fk = Column(Integer, ForeignKey('studios.id'))