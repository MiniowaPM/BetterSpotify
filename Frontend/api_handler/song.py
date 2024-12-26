import requests
from Frontend.config.server_settings import server_url

def delete_song(song_id: int, jwt_token):
    url = f"{server_url}/user/{song_id}"
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
    
def patch_song(song_id: str, jwt_token, title: str = None, description: str = None, genre_id: int = None):
    url = f"{server_url}/user/{song_id}"
    header = {
    "Authorization": f"Bearer {jwt_token['access_token']}"
    }
    params = {}
    if title is not None:
        params['title'] = title
    if description is not None:
        params['description'] = description
    if genre_id is not None:
        params['genre'] = genre_id
    try:
        response = requests.patch(url, headers=header, json=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def get_song(song_id: str, jwt_token):
    url = f"{server_url}/user/{song_id}"
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

def post_song(album_id: int, title: str, description: str, genre_id: int):
    url = f"{server_url}/song/album/{album_id}/song"
    params = {
        "title": title,
        "description": description,
        "genre": genre_id
}
    try:
        response = requests.post(url, json=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
    
def get_songs(jwt_token):
    url = f"{server_url}/song/all"
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