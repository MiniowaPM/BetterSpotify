# BetterSpotify ⛅ #

> A backend REST API built with FastAPI for handling http requests to database. It is designed to be fast, efficient, and easy to integrate.

## Table of Contents ##
- [About the Project](#about-the-project-)
- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Getting Started](#getting-started-)
  - [Prerequisites](#prerequisites-)
  - [Installation](#installation-)
- [API Endpoints](#api-endpoints-)
- [Contact](#contact-)

## About the Project 📝

> This FastAPI-based REST API provides endpoints to handle save and secure connection to database, user authenticaton via JSON Web Token (JWT), database injection based on user permision via HTTP methods. It is optimized for performance, provides detailed API documentation, and follows best practices for API development.

## Features ✨ ##
- CRUD operations for managing resources.
- JWT-based authentication and authorization.
- Validation of request data using Pydantic.
- OpenAPI documentation available at /docs.
- Integration-ready with databases (MySQL, SQLite, PostgreSQL, Oracle, MicrosoftSQL).

## Tech Stack 🛠️ ##

- Framework: FastAPI
- Language: Python 3.8+
- Database: MySQL (SQLAlchemy)
- Authentication: JWT
- Encription: Bcrypt
- Other Tools: Uvicorn, Pydantic

## Getting Started 🚀 ##

Follow these instructions to set up the project locally.

### Prerequisites 🔧 ###
- Python 3.8 or higher
- Pipenv

### Installation ⚙️ ###

1. Clone the repository:

```git clone https://github.com/MiniowaPM/BetterSpotyfy.git```

```cd BetterSpotify/Backend```

2. Create and activate a virtual environment:

```python -m venv .env```

For Linux/Mac

```source venv/bin/activate```  

For Windows

```.env\Scripts\activate```     

3. Install dependencies:

```pip install -r requirements.txt```

4. Set up config file in the Backend/core/config.py directory and change setting class values:

```DATABASES = 1 ``` # 1: MySQL, 2: SQLite, 3: PostgreSQL,  4: ...

```DB_USER = "API_ADMIN" ```

```DB_PASSWORD = "password123" ```

```DB_HOST = "localhost" ```

```DB_PORT = "3306" ```

```DB_NAME = "TEST_API" ```

5. Run the MySQL database:

Open database menagment system (eg. XAMPP):

``` Create database database_name ```

``` CREATE USER 'database_user' IDENTIFIED BY 'database_user_password'; ```

``` GRANT ALL PRIVILEGES ON database_name.* TO 'database_user'; ```

7. Start the development server:

```uvicorn main:app --reload```

## API Endpoints 🌐 ##

Base URL: http://localhost:8000

### User Endpoints ###

| Method | Endpoint           | Description                     | Auth Required              |
|--------|--------------------|---------------------------------|----------------------------|
| POST   | /user/signup       | Sign-up initial user            | No                         |
| POST   | /user/             | Create non-admin user in studio | JWT Token + is_admin       |
| POST   | /user/me/profile-image/ | Uploads user profile image | JWT Token                  |
| PATCH  | /user/me           | Update logged user              | JWT Token                  |
| PATCH  | /user/{user_id}    | Update selected user            | JWT Token + is_admin       |
| DELETE | /user/{user_id}    | Delete user                     | JWT Token + is_admin       |
| GET    | /user/me           | Get all logged user info        | JWT Token                  |
| GET    | /user/{user_id}/profile-image/ | Get user profile image | JWT Token               |
| GET    | /user/studio       | Get all users in studio         | JWT Token + is_admin       |

### Album Endpoints ###

| Method | Endpoint                         | Description                    | Auth Required              |
|--------|------------------------------------------|--------------------------------|----------------------------|
| POST   | /album/                                  | Add a new album owned by logged studio  | JWT Token + is_admin |
| POST   | /album/{user_id}/album-image/            | Uploads album thumbnail image           | JWT Token            |
| PATCH  | /album/{album_id}                        | Update album details                    | JWT Token + is_admin |
| DELETE | /album/{album_id}                        | Delete album                            | JWT Token + is_admin |
| GET    | /album/myCollection                      | Get albums owned by logged studio       | JWT Token            |
| GET    | /album/explore/studio/{studio_id}/albums | Get albums where price is set & not owned by studio            | JWT Token  |
| GET    | /album/selling                           | Get albums owned by studio logged and with price               | JWT Token  |
| GET    | /albums/{user_id}/album-image/           | Get user album thumbnail image          | JWT Token            |

### Song Endpoint ###

| Method | Endpoint                    | Description                          | Auth Required              |
|--------|-----------------------------|--------------------------------------|----------------------------|
| POST   | /song/album/{album_id}/song | Add a new song assigned to an album  | JWT Token + is_admin       |
| PATCH  | /song/{song_id}             | Update song details                  | JWT Token + is_admin       |
| DELETE | /song/{song_id}             | Delete song                          | JWT Token + is_admin       |
| GET    | /song/album/{album_id}      | Get songs details by album id        | JWT Token                  |

### Other Endpoints ###

| Method | Endpoint              | Description                    | Auth Required              |
|--------|-----------------------|--------------------------------|----------------------------|
| GET    | /                     | Default page                   | No                         |
| GET    | /auth/token           | Login and get access token     | No                         |


### Extra info: ###
> JWT Token is aquired by logging to the database with /auth/token route

> is_admin is condition whether the user accout has record ```is_admin == 1```  

Detailed documentation and interactive API docs available at /docs (Swagger UI).

## Contact 📞 ##

Name: Miniowa

Email: 31001@s.pm.szczecin.pl

GitHub: @MiniowaPM
