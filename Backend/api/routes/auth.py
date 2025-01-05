from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Annotated
import models, schemas, db
from .. import db_dependency
from schemas import Token
from ..dependencies import authenticate_user, create_access_token
from datetime import timedelta


router = APIRouter(prefix="/auth")

@router.post("/token", tags=["Auth"], status_code=status.HTTP_201_CREATED, response_model=Token)
async def login_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    # Verify via username and password
    user = authenticate_user(form_data.username, form_data.password, db)
    # Validation failed. Wrong password or username
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unable to validate user")
    # Creates JWT token (stores: studio_fk, is_admin, user_id, expire_time)
    token = create_access_token(user.id, user.is_admin, user.studio_fk, timedelta(minutes=30))
    return {'access_token': token, 'token_type':'bearer'}