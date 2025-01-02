import axios from 'axios';
import { serverUrl } from './server_settings.js';

export async function deleteAlbum(albumId, jwtToken) {
    const url = `${serverUrl}/album/${albumId}`;
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

  export async function patchAlbum(albumId, jwtToken, title = null, description = null, genre = null) {
    const url = `${serverUrl}/album/${albumId}`;
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

export async function getAlbum(albumId, jwtToken) {
    const url = `${serverUrl}/album/${albumId}`;
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

export async function postAlbum(jwtToken, title, description, genre) {
    const url = `${serverUrl}/album/`;
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

export async function getAlbums(jwtToken) {
    const url = `${serverUrl}/album/all`;
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

export async function postAlbumImg(albumId, jwtToken, imgData) {
    const url = `${serverUrl}/user/${albumId}/album-image`;
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

export async function getAlbumImg(albumId, jwtToken) {
    const url = `${serverUrl}/user/${albumId}/album-image`;
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