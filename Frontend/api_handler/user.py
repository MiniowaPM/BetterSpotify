import requests
from Frontend.config.server_settings import server_url

def login_token(login: str, password: str):
    url = f"{server_url}/auth/token"
    params = {
        "grant_type": "password",
        "username": login,
        "password": password
        }
    try:
        response = requests.post(url, data=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def delete_user(user_id: int, jwt_token):
    url = f"{server_url}/user/{user_id}"
    header = {
        "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    try:
        response = requests.delete(url, headers=header)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
    
def patch_user(user_id: str, jwt_token, username: str = None, first_name: str = None, last_name:str = None, email:str = None, gender:int = None, password_hash: str = None, is_admin: bool = None):
    url = f"{server_url}/user/{user_id}"
    header = {
    "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    params = {}
    if username is not None:
        params['username'] = username
    if first_name is not None:
        params['first_name'] = first_name
    if last_name is not None:
        params['last_name'] = last_name
    if email is not None:
        params['email'] = email
    if gender is not None:
        params['gender'] = gender
    if password_hash is not None:
        params['password_hash'] = password_hash
    if is_admin is not None:
        params['is_admin'] = is_admin
    try:
        response = requests.patch(url, headers=header, json=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def get_user(user_id: str, jwt_token):
    url = f"{server_url}/user/{user_id}"
    header = {
        "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    try:
        response = requests.get(url, headers=header)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def post_user(username: str, first_name: str, last_name:str, email:str, gender:int, password_hash: str):
    url = f"{server_url}/user/"
    params = {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "gender": gender,
        "password_hash": password_hash
    }
    try:
        response = requests.post(url, json=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
    
def get_users(jwt_token):
    url = f"{server_url}/user/all"
    header = {
        "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    try:
        response = requests.get(url, headers=header)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def post_user_img(jwt_token, img_data):
    url = f"{server_url}/user/me/profile-image/"
    header = {
        "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    try:
        response = requests.post(url, headers=header, data=img_data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
    
def get_user_img(user_id: str, jwt_token):
    url = f"{server_url}/user/{user_id}/profile-image"
    header = {
        "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    try:
        response = requests.get(url, headers=header)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Get token
jwt_token = login_token("test","test")

# TODO: Upload user profile image
# TODO: Update user profile image