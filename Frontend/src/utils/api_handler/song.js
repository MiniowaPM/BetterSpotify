import axios from 'axios';
import { serverUrl } from './server_settings.js';

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

export async function patchSong(songId, jwtToken, title = null, length = null) {
    const url = `${serverUrl}/song/${songId}`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    const params = {};
    if (title !== null) params.title = title;
    if (length !== null) params.length = length;
    try {
        const response = await axios.patch(url, params, { headers });
        return response.data;

    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}

export async function getSongInAlbum(songId, jwtToken) {
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

export async function getSongsInAlbum(albumId, jwtToken) {
  const url = `${serverUrl}/song/album/${albumId}`;
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

export async function postSong(albumId, jwtToken, title, length) {
    const url = `${serverUrl}/song/album/${albumId}/song`;
    const headers = {
        Authorization: `Bearer ${jwtToken.access_token}`,
      };
    const params = {
        "title": title,
        "length": length,
    }
    try {
        const response = await axios.post(url, params, { headers });
        return response.data;
    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}