from fastapi import APIRouter, Depends, HTTPException, status, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from pathlib import Path
from typing import List
import models, schemas, db
from api.dependencies.auth import user_dependency
from api.dependencies.db import db_dependency
from schemas.user import UpdateUserBase, CreateInitUserBase, CreateUserBase
from schemas.response import SuccessResponse
from core.security import bcrypt_context
from sqlalchemy import func
import base64
from PIL import Image


router = APIRouter(prefix="/user")

# SignupForm # Signup form request
@router.post("/signup", tags=["User"], status_code=status.HTTP_201_CREATED, response_model=SuccessResponse)
async def create_init_user(user: CreateInitUserBase, db: db_dependency):
    if not db.query(models.Studio).filter(models.Studio.studio_name == user.studio_name).first():
        new_studio = models.Studio(studio_name = user.studio_name)
        db.add(new_studio)
        db.commit()
        db.refresh(new_studio)
        studio_id = new_studio.id
    else: 
        raise HTTPException(status_code=409, detail="Studio name already taken")

    password_bcrypt_hash = bcrypt_context.hash(user.password_hash)
    user = models.User(
        username = user.username,
        password_hash = password_bcrypt_hash,
        studio_fk = studio_id,
        is_admin = True
    )
    # Check if exists in database
    if db.query(models.User).filter(models.User.username == user.username).first() is not None:
        raise HTTPException(status_code=409, detail="Username already exists")
    db.add(user)
    db.commit()
    return {"detail": "User successfully created"}

# HomePage # Get currently logged user info
@router.get("/me", tags=["User"], status_code=status.HTTP_200_OK)
async def get_current_user(db: db_dependency, user_auth: user_dependency):
    user_id = user_auth["id"]
    # Check for JWT token whether user logged
    if user_auth is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    user_with_studio = (
        db.query(models.User, models.Studio.studio_name)
        .join(models.Studio, models.User.studio_fk == models.Studio.id)
        .filter(models.User.id == user_id)
        .first()
    )
    user_data = {
        "id": user_with_studio.User.id,
        "username": user_with_studio.User.username,
        "studio_name": user_with_studio.studio_name,
        "is_admin": user_with_studio.User.is_admin,
    }
    return user_data

# AdminPanel # Creates non-admin user as admin
@router.post("/", tags=["User"], status_code=status.HTTP_201_CREATED, response_model=SuccessResponse)
async def create_user(user: CreateUserBase, user_auth: user_dependency, db: db_dependency):
    # Check if logged
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    password_bcrypt_hash = bcrypt_context.hash(user.password_hash)
    studio_id = user_auth.get('studio_fk')
    user = models.User(
        username = user.username,
        password_hash = password_bcrypt_hash,
        studio_fk = studio_id,
    )
    if db.query(models.User).filter(models.User.username == user.username).first() is not None:
        raise HTTPException(status_code=409, detail="Username already exists")
    db.add(user)
    db.commit()
    return {"detail": "User successfully created"}

# AdminPanel # Deletes ONLY non-admin user
@router.delete("/{user_id}", tags=["User"], status_code=status.HTTP_200_OK)
async def delete_user(user_id: int, db: db_dependency, user_auth: user_dependency):
    # Check for JWT token and user permissions (is_admin == 1)
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    user = db.query(models.User).filter(models.User.id == user_id).first()
    # User does not exists in database
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if user_auth.get('studio_fk') != user.studio_fk:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unable to delete users from diffrent groups")
    if user.is_admin == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unable to delete admin user")
    db.delete(user)
    db.commit()
    return {"detail": "User successfully deleted"}

# UserProfile # Update user profile image
@router.post("/me/profile-image/",  tags=["User"], status_code=status.HTTP_200_OK, response_model=SuccessResponse)
async def upload_user_profile_image(user_auth: user_dependency, file: UploadFile):
    base_dir = Path(__file__).resolve().parent.parent.parent
    # Check for file extention
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in [".jpg", ".jpeg", ".png"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only .jpg, .jpeg, .png are allowed.")
    image_path = base_dir/"images"/"users"/ f"{user_auth["id"]}.jpg"
    if user_auth is None:
        HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    try:
        with open(image_path, "wb") as image_data:
            image_data.write(await file.read())
            image = Image.open(image_path)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGB")
            image = image.resize((512, 512), Image.LANCZOS)
            image.save(image_path)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="File failed to create")
    return {"detail": "User profile image succesfuly created"}

# UserProfile & HomePage # Get user profile image
@router.get("/{user_id}/profile-image", tags=["User"], status_code=status.HTTP_200_OK)
async def get_user_profile_image(user_id: str, user_auth: user_dependency):
    if user_id == "me":
        user_id = user_auth["id"]
    else:
        user_id = int(user_id)
    if user_auth is None:
        HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed')
    base_dir = Path(__file__).resolve().parent.parent.parent
    image_path = base_dir/"images"/"users"/f"{user_id}.jpg"
    if not image_path.is_file():
        image_path = base_dir/"images"/"users"/"default.jpg"
    try:
        with open(image_path,"rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
        mime_type = "image/jpg"
        return JSONResponse(content={"mime_type": mime_type, "base64_data": encoded_image})
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
# AdminPanel # Update user 
@router.patch("/{user_id}", tags=["User"], status_code=status.HTTP_200_OK)
async def update_user(user_id: str, user: UpdateUserBase, db: db_dependency, user_auth: user_dependency):
    print('test')
    if user_id == "me":
        user_id = user_auth["id"]
    else:
        user_id = int(user_id)
    if user_id is not user_auth["id"] and not user_auth.get("is_admin", False):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    user_query = db.query(models.User).filter(models.User.id == user_id).first()
    # User does not exists in database
    if user_query is None: 
        raise HTTPException(status_code=404, detail="User not found")
    # For each patched (inserted) element set an attribute of selected record
    update_data = user.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
        if key == "password_hash":
            value = bcrypt_context.hash(user.password_hash)
        if key == "is_admin" and user_auth.get("is_admin", False) is False:
            value = False
        setattr(user_query, key, value)
    if user_auth.get("is_admin", False):
            admin_users_in_studio = db.query(func.count(models.User.id)).filter(models.User.is_admin == True, models.User.studio_fk == user_auth.get('studio_fk')).scalar()
            print(admin_users_in_studio)
            if admin_users_in_studio == 1:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot delete the only admin in the group. Assign another admin before proceeding.")
    db.commit()
    return {"detail": "User successfully modified"}

# AdminPanel # Get user in studio
@router.get("/studio", tags=["User"], status_code=status.HTTP_200_OK)
async def get_users_in_group(db: db_dependency, user_auth: user_dependency):
    if user_auth is None or not user_auth.get('is_admin', False):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed or insufficient premissions')
    studio_id = user_auth["studio_fk"]
    users_with_studios = (
        db.query(models.User)
        .where(models.User.studio_fk == studio_id)
        .all()
    )
    return users_with_studios