import axios from 'axios';
import { serverUrl } from './server_settings.js';

export async function loginToken(login, password) {
  const url = `${serverUrl}/auth/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', login);
    params.append('password', password);
  try {
    const response = await axios.post(url, params)
    return response.data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 'failed to login';
  }
}

export async function deleteUser(userId, jwtToken) {
    const url = `${serverUrl}/user/${userId}`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
  
    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
  }

export async function patchUser(userId, jwtToken, username = null, passwordHash = null, isAdmin = null) {
    const url = `${serverUrl}/user/${userId}`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    const params = {};
    if (username !== null) params.username = username;
    if (passwordHash !== null) params.password_hash = passwordHash;
    if (isAdmin !== null) params.is_admin = isAdmin;
    
    try {
        const response = await axios.patch(url, params, { headers });
        return response.data;
    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function getLoggedUser(jwtToken) {
    const url = `${serverUrl}/user/me`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    try {
        const response = await axios.get(url, {headers});
        return response.data;

    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function getUsersInStudio(jwtToken) {
  const url = `${serverUrl}/user/studio`;
  const headers = {
    Authorization: `Bearer ${jwtToken.access_token}`,
  };
  try {
      const response = await axios.get(url, {headers});
      return response.data;

  } catch(error){
      console.error(`Error: ${error.message}`);
      return null;
  }
}

export async function postInitUser(username, passwordHash, studioName) {
    const url = `${serverUrl}/user/signup`;
    const headers = {
      "accept": "application/json",
      "Content-Type": "application/json"
    };
    const params = {
        "username": username,
        "password_hash": passwordHash,
        "studio_name": studioName
    }
    try {
        const response = await axios.post(url, params, {headers});
        return response.data;
    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function postUser(username, passwordHash, jwtToken) {
  const url = `${serverUrl}/user/`;
  const headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${jwtToken.access_token}`,
  };
  const params = {
      "username": username,
      "password_hash": passwordHash,
  }
  try {
      const response = await axios.post(url, params, {headers});
      return response.data;
  } catch(error){
      console.error(`Error: ${error.message}`);
      return null;
  }
}

export async function postUserImg(jwtToken, imgData) {
    const url = `${serverUrl}/user/me/profile-image`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    const params = {
        "img_data": imgData
    };
    try {
        const response = await axios.post(url, params, { headers });
        return response.data;

    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function getUserImg(userId, jwtToken) {
    const url = `${serverUrl}/user/${userId}/profile-image`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}