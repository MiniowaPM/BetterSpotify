from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session
import models, schemas, db
from .. import db_dependency, user_dependency
from schemas import CreateSongBase, UpdateSongBase, SuccessResponse

router = APIRouter(prefix="/song")

# Album profile # delete song by id
@router.delete("/{song_id}", tags=["Song"], status_code=status.HTTP_200_OK)
async def delete_song(song_id: int, db: db_dependency, user_auth: user_dependency):
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    song = db.query(models.Song).filter(models.Song.id == song_id).first()
    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    db.delete(song)
    db.commit()
    return {"detail": "Song successfully cleared"}

# Album profile # create song
@router.post("/album/{album_id}/song", tags=["Song"], status_code=status.HTTP_201_CREATED, response_model=SuccessResponse)
async def create_song(album_id: int, song: CreateSongBase, db: db_dependency, user_auth: user_dependency):
    # Logged JWT Token validation and user permisions
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    db_song = models.Song(**song.model_dump(), album_fk=album_id)
    if db.query(models.Album).filter(models.Album.id == album_id).first() is None:
        raise HTTPException(status_code=404, detail="Album id not found")
    if db.query(models.Song).filter(models.Song.title == db_song.title).first() is not None:
        raise HTTPException(status_code=409, detail="Title already exists")
    db.add(db_song)
    db.commit()
    return {"detail": "Song and associated foreign key successfully created"}

# Album profile # update song
@router.patch("/{song_id}", tags=["Song"], status_code=status.HTTP_200_OK)
async def update_user(song_id: int, song: UpdateSongBase, db: db_dependency, user_auth: user_dependency):
    # Logged JWT Token validation and user permisions
    if user_auth is None or not user_auth.get("is_admin", False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    song_query = db.query(models.Song).filter(models.Song.id == song_id).first()
    if song_query is None: 
        raise HTTPException(status_code=404, detail="Song not found")
    # Insert only provided data
    update_data = song.dict(exclude_unset=True)
    for key, value in update_data.items():
            setattr(song_query, key, value)
    db.commit()
    return {"detail": "Song successfully modified"}

# Album profile # get songs in album
@router.get("/album/{album_id}", tags=["Song"], status_code=status.HTTP_200_OK)
async def get_song(db: db_dependency, user_auth: user_dependency, album_id: int):
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    songs = db.query(models.Song).filter(models.Song.album_fk == album_id).all()
    album_data = db.query(models.Album).filter(models.Album.id == album_id).first()
    if songs is None:
        raise HTTPException(status_code=404, detail="Songs not found")
    if album_data is None:
        raise HTTPException(status_code=404, detail="Album not found")
    fetched_data = {
        "title": album_data.title,
        "artist": album_data.artist,
        "genre": album_data.genre.name,
        "description": album_data.description,
        "songs": songs
    }
    return fetched_data