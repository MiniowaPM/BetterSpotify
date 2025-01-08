from sqlalchemy import Column, Integer, String, ForeignKey, Float
from db import Base

class Song(Base):
    __tablename__ = 'songs'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), unique=True)
    length = Column(Integer, unique=False)
    album_fk = Column(Integer, ForeignKey('albums.id'))