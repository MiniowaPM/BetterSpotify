from pydantic import BaseModel

class CreateSongBase(BaseModel):
    title: str
    length: int

class UpdateSongBase(BaseModel):
    title: str | None = None
    length: int | None = None

class Config:
    orm_mode = True
    use_enum_values = True