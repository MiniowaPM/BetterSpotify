from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path
from typing import List
from sqlalchemy import func
from sqlalchemy.orm import Session
import models, schemas, db
from schemas import CreateAlbumBase, UpdateAlbumBase, SuccessResponse
from .. import db_dependency, user_dependency

router = APIRouter(prefix="/album")

# My Collection # Create album and creates album_owned (album_id, studio_fk)
@router.post("/", tags=["Album"], status_code=status.HTTP_201_CREATED, response_model=SuccessResponse)
async def create_album(album: CreateAlbumBase, user_auth: user_dependency, db: db_dependency):
    # Check if logged
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    # Create album table
    album = models.Album(**album.model_dump(), price = None)
    db.add(album)
    db.commit()
    db.refresh(album)
    # Create album_owned table
    studio_id = user_auth.get("studio_fk")
    album_owned = models.Albums_owned(
        album_fk = album.id,
        studio_fk = studio_id,
    )
    db.add(album_owned)
    db.commit()
    return {"detail": "Album successfully created"}

# My Collection # Deletes album and songs assigned to album # By album_id
@router.delete("/{album_id}", tags=["Album"], status_code=status.HTTP_200_OK)
async def delete_album(album_id: int, db: db_dependency, user_auth: user_dependency):
    # Logged JWT Token validation and user permisions
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    album = db.query(models.Album).filter(models.Album.id == album_id).first()
    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    db.query(models.Song).filter(models.Song.album_fk == album_id).delete()
    db.delete(album)
    db.commit()
    return {"detail": "Album and associated songs data successfully cleared"}

# Album Profile # Updates album data
@router.patch("/{album_id}", tags=["Album"], status_code=status.HTTP_200_OK)
async def update_album(album_id: int, album: UpdateAlbumBase, db: db_dependency, user_auth: user_dependency):
    # Logged JWT Token validation and user permisions
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    album_query = db.query(models.Album).filter(models.Album.id == album_id).first()
    if album_query is None: 
        raise HTTPException(status_code=404, detail="Album not found")
    # Insert only provided data
    update_data = album.dict(exclude_unset=True)
    for key, value in update_data.items():
            setattr(album_query, key, value)
    db.commit()
    return {"detail": "Album successfully modified"}

# My Collection # Get album data owned by logged studio
@router.get("/myCollection", tags=["Album"], status_code=status.HTTP_200_OK)
async def get_myCollection(db: db_dependency, user_auth: user_dependency):
    studio_id = user_auth.get("studio_fk")
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    album = (
    db.query(models.Album)
    .join(models.Albums_owned, models.Album.id == models.Albums_owned.album_fk)
    .filter(models.Albums_owned.studio_fk == studio_id)
    .all()
    )
    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    return album

# Explore # Get studios + album count
@router.get("/studio/", tags=["Studio"], status_code=status.HTTP_200_OK)
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

# Explore # Get album by id
@router.get("/explore/studio/{studio_id}/albums", tags=["Album"], status_code=status.HTTP_200_OK)
async def get_explore(db: db_dependency, user_auth: user_dependency, studio_id: int):
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    album = (
        db.query(models.Album)
        .filter(models.Album.price != None)
        .filter(models.Album.id == studio_id)
        .all()
        )
    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    return album

# Selling # Get album data with price and owned by logged studio
@router.get("/selling", tags=["Album"], status_code=status.HTTP_200_OK)
async def get_selling(db: db_dependency, user_auth: user_dependency):
    studio_id = user_auth.get("studio_fk")
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    album = (
    db.query(models.Album)
    .join(models.Albums_owned, models.Album.id == models.Albums_owned.album_fk)
    .filter(models.Albums_owned.studio_fk == studio_id)
    .filter(models.Album.price != None)
    .all()
    )
    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    return album

# Cart # Get wallet
@router.get("/cart", tags=["Album"], status_code=status.HTTP_200_OK)
async def get_wallet(db: db_dependency, user_auth: user_dependency):
    studio_id = user_auth.get("studio_fk")
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    wallet = (
    db.query(models.Studio.wallet)
    .filter(models.Studio.id == studio_id)
    .first()
    )
    if wallet is None:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return {"wallet": wallet[0]}

# Get album thumbnali image #
@router.get("/{album_id}/album_image/", tags=["Album"], status_code=status.HTTP_200_OK, response_model=SuccessResponse)
async def get_album_thumbnail_image(album_id: int, user_auth: user_dependency):
    if user_auth is None or not user_auth.get('is_admin', False):
        HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    base_dir = Path(__file__).resolve().parent.parent.parent
    image_path = base_dir/"images"/"albums"/f"{album_id}.jpg"
    if not image_path.is_file():
        image_path = base_dir/"images"/"albums"/"default.jpg"
    return FileResponse(image_path)

# Post album thumbnail image #
@router.post("/{album_id}/album_image/", tags=["Album"], status_code=status.HTTP_200_OK, response_model=SuccessResponse)
async def upload_album_thumbnail_image(album_id: int ,user_auth: user_dependency, file: UploadFile):
    base_dir = Path(__file__).resolve().parent.parent.parent
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in [".jpg", ".jpeg", ".png"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only .jpg, .jpeg, .png are allowed.")
    image_path = base_dir/"images"/"albums"/ f"{album_id}.jpg"
    if user_auth is None or not user_auth.get('is_admin', False):
        HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    try:
        with open(image_path, "wb") as f:
            f.write(await file.read())
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="File failed to create")
    return {"detail": "User profile image succesfuly created"}