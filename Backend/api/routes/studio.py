from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
import models
from schemas import UpdateStudioBase
from .. import db_dependency, user_dependency

router = APIRouter(prefix="/studio")

# Explore # Get studios + album count
@router.get("/", tags=["Studio"], status_code=status.HTTP_200_OK)
async def get_studios(db: db_dependency, user_auth: user_dependency):
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    studio_id = user_auth.get("studio_fk")
    studios = (
        db.query(
            models.Studio.id.label("id"),
            models.Studio.studio_name.label("studio_name"),
            func.count(models.Albums_owned.id).label("album_count")
        )
        .outerjoin(models.Albums_owned, models.Albums_owned.studio_fk == models.Studio.id)
        .join(models.Album, models.Albums_owned.album_fk == models.Album.id)
        .filter(models.Studio.id != studio_id)
        .filter(models.Album.price != None)
        .group_by(models.Studio.id, models.Studio.studio_name)
        .all()
    )
    if studios == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Studio not found')
    db.commit()
    return [{"id": studio.id,"studio": studio.studio_name, "album_count": studio.album_count} for studio in studios]

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

@router.patch("/{studio_id}", tags=["Studio"], status_code=status.HTTP_200_OK)
async def update_album(studio_id: int, studio: UpdateStudioBase, db: db_dependency, user_auth: user_dependency):
    # Logged JWT Token validation and user permisions
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    studio_query = db.query(models.Studio).filter(models.Studio.id == studio_id).first()
    if studio_query is None: 
        raise HTTPException(status_code=404, detail="Studio not found")
    # Insert only provided data
    update_data = studio.dict(exclude_unset=True)
    for key, value in update_data.items():
            setattr(studio_query, key, value)
    db.commit()
    return {"detail": "Studio successfully modified"}