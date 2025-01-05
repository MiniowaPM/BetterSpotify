from pydantic import BaseModel

class CreateAlbumOwnageBase(BaseModel):
    studio: int
    album: int

class UpdateAlbumOwnageBase(BaseModel):
    studio: int | None = None
    album: int  | None = None

class Config:
    orm_mode = True
    use_enum_values = True