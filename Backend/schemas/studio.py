from pydantic import BaseModel

class CreateStudioBase(BaseModel):
    studio_name: str
    wallet: float

class UpdateStudioBase(BaseModel):
    studio_name: str | None = None
    wallet: float | None = None

class Config:
    orm_mode = True
    use_enum_values = True