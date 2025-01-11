from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
import models
from .. import db_dependency, user_dependency

router = APIRouter(prefix="/studio")

# Explore # Get studios + album count
@router.get("/", tags=["Studio"], status_code=status.HTTP_200_OK)
async def get_studios(db: db_dependency, user_auth: user_dependency):
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    studio_id = user_auth.get("studio_fk")
    studio = (
        db.query(models.Studio, func.count(models.Albums_owned.id))
        .outerjoin(models.Albums_owned, models.Albums_owned.studio_fk == models.Studio.id)
        .filter(models.Albums_owned.studio_fk != studio_id)
        .group_by(models.Studio.id))
    db.commit()
    return studio

# Cart # Get my wallet
@router.get("/wallet", tags=["Studio"], status_code=status.HTTP_200_OK)
async def get_wallet(db: db_dependency, user_auth: user_dependency):
    studio_id = user_auth.get("studio_fk")
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    wallet = (
    db.query(models.Studio.wallet)
    .filter(models.Studio.id == studio_id)
    .first()
    )
    wallet_value = wallet[0] 
    if wallet[0] == None:
        wallet_value = 0
    return {"wallet": wallet_value}