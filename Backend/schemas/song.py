from pydantic import BaseModel

class CreateSongBase(BaseModel):
    title: str
    lenght: int

class UpdateSongBase(BaseModel):
    title: str | None = None
    lenght: int | None = None
    album: int | None = None

class Config:
    orm_mode = True
    use_enum_values = True