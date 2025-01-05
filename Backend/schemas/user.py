from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    password_hash: str
    is_admin: bool
    studio: int

class CreateUserBase(BaseModel):
    username: str
    password_hash: str
    studio: int

class UpdateUserBase(BaseModel):
    username: str | None = None
    password_hash: str | None = None
    is_admin: bool = Optional[False]
    studio: int

class Config:
    orm_mode = True
    use_enum_values = True