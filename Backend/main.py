from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import auth_router, user_router, album_router, song_router
from db import engine, Base

# Create instance of an FastApi app
app = FastAPI()

# Allow specific origins
origins = [
    "http://localhost:8080",  # Your Vue.js frontend
    "http://127.0.0.1:8080",  # Alternative localhost URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include API routers
app.include_router(user_router)
app.include_router(album_router)
app.include_router(song_router)
app.include_router(auth_router)

# Initialize and create the database tables
Base.metadata.create_all(bind=engine)

# Default route
@app.get("/")
def Deafault():
    return {"message": "Welcome to the FastAPI app!"}