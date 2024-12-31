import axios from 'axios';
import { serverUrl } from '../config/server_settings.js';

export async function deleteSong(songId, jwtToken) {
    const url = `${serverUrl}/song/${songId}`;
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

export async function patchSong(songId, jwtToken, title = null, description = null, genre = null) {
    const url = `${serverUrl}/song/${songId}`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    const params = {};
    if (title !== null) params.title = title;
    if (description !== null) params.description = description;
    if (genre !== null) params.genre = genre;

    try {
        const response = await axios.patch(url, params, { headers });
        return response.data;

    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function getSong(songId, jwtToken) {
    const url = `${serverUrl}/song/${songId}`;
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

export async function postSong(albumId, jwtToken, title, description, genre) {
    const url = `${serverUrl}/song/album/${albumId}/song`;
    const headers = {
        Authorization: `Bearer ${jwtToken.access_token}`,
      };
    const params = {
        "title": title,
        "description": description,
        "genre": genre
    }
    try {
        const response = await axios.post(url, params, { headers });
        return response.data;
    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function getSongs(jwtToken) {
    const url = `${serverUrl}/song/all`;
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