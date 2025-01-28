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

  export async function patchAlbum(albumId, jwtToken, title = null, description = null,  artist = null, price = null , genre = null) {
    const url = `${serverUrl}/album/${albumId}`;
    const headers = {
      Authorization: `Bearer ${jwtToken.access_token}`,
    };
    const params = {};
    if (title !== null) params.title = title;
    if (description !== null) params.description = description;
    if (artist !== null) params.artist = artist;
    if (price !== null) params.price = price;
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

export async function postAlbum(jwtToken, title, description, artist, releaseDate, genre) {
    const url = `${serverUrl}/album/`;
    const headers = {
        Authorization: `Bearer ${jwtToken.access_token}`,
      };
    const params = {
        "title": title,
        "description": description,
        "artist": artist,
        "release_date": releaseDate, //"2025-01-08"
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

export async function getMyCollection(jwtToken) {
    const url = `${serverUrl}/album/myCollection`;
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

export async function getAlbumsByStudio(studio_id ,jwtToken) {
    const url = `${serverUrl}/album/explore/studio/${studio_id}/albums`;
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

export async function getStudioName(studio_id ,jwtToken) {
    const url = `${serverUrl}/album/explore/studio/${studio_id}`;
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

export async function getSelling(jwtToken) {
    const url = `${serverUrl}/album/selling`;
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

export async function getWallet(jwtToken) {
    const url = `${serverUrl}/studio/wallet`;
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

export async function getStudio(jwtToken) {
    const url = `${serverUrl}/studio`;
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
    const url = `${serverUrl}/album/${albumId}/album_image`;
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
    const url = `${serverUrl}/album/${albumId}/album_image/`;
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

export async function postPurchaseAlbum(albumId, jwtToken) {
    const url = `${serverUrl}/album/${albumId}/purchase/`;
    const headers = {
        Authorization: `Bearer ${jwtToken.access_token}`,
      };
    try {
        const response = await axios.post(url, null, { headers });
        return response.data;
    } catch(error){
        console.error(`Error: ${error.message}`);
        return null;
    }
}