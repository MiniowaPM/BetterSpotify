import requests
from settings import server_url

def login_token(login:str, password:str):
    url = f"{server_url}/auth/token"
    parms = {
        "grant_type": "password",
        "username": login,
        "password": password
        }
    try:
        response = requests.post(url, parms=parms)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def delete_user(user_id):
    url = f"{server_url}/user/{user_id}"
    return None

print(login_token("test","test"))