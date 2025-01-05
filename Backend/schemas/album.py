from pydantic import BaseModel
from models.album import Genre

class CreateAlbumBase(BaseModel):
    title: str
    description: str
    artist: str
    price: float
    genre: Genre

class UpdateAlbumBase(BaseModel):
    title: str | None = None
    description: str | None = None
    artist: str | None = None
    price: float | None = None
    genre: Genre | None = None

class Config:
    orm_mode = True
    use_enum_values = True