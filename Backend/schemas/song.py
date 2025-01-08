from pydantic import BaseModel

class CreateSongBase(BaseModel):
    title: str
    lenght: float
    # album: int

class UpdateSongBase(BaseModel):
    title: str | None = None
    lenght: float | None = None
    album: int | None = None

class Config:
    orm_mode = True
    use_enum_values = True