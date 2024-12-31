import {
    loginToken,
    deleteUser,
    getUser,
    postUser,
    getUsers,
    postUserImg,
    getUserImg,
    patchUser
  } from './api_handler/user.js';

  import {
    deleteAlbum,
    patchAlbum,
    getAlbum,
    postAlbum,
    getAlbums,
    postAlbumImg,
    getAlbumImg,
  } from './api_handler/album.js';
  
  import {
    deleteSong,
    patchSong,
    getSong,
    postSong,
    getSongs,
  } from './api_handler/song.js';
  

  async function runUserTests() {
    const login = 'test';
    const password = 'test';
  
    // 1. Test Login
    const token = await loginToken(login, password);
    if (!token) {
      console.error('Failed to log in.');
      return;
    }
  
    // 2. Test Create User
    const createUser = await postUser('test1','Mikołaj','Mol','mikisteam123@o2.pl', 1,'test1');
    if (!createUser) {
      console.error('Failed to create user');
    }

    // 3. Test Patch User
    const updateUser = await patchUser('me', token, null, 'firstname');
    if (!updateUser) {
      console.error('Failed to update user');
    }
    // 4. Test Get User
    const getUserData = getUser(1, token);
    if (!getUserData) {
      console.error('Failed to get user data');
    }
    // 5. Test Get Users
    const getUsersData = getUsers(token);
    if (!getUsersData) {
      console.error('Failed to get users data');
    }
    // 6. Test Delete User
    const clearUser = deleteUser(1, token)
  }

  async function runSongTest(params) {
    const login = 'test';
    const password = 'test';
  
    // 1. Test Login
    const token = await loginToken(login, password);
    if (!token) {
      console.error('Failed to log in.');
      return;
    }

    
  }

  async function runAlbumTests() {
    const login = 'test';
    const password = 'test';
  
    // 1. Test Login
    const token = await loginToken(login, password);
    if (!token) {
      console.error('Failed to log in.');
      return;
    }
  
    // 2. Test Create Song
    const createSong = await postAlbum(token, 'Test Song', 'A description', 4);
    if (!createSong){
      console.error('Failed to add song');
    }

    // 3. Test Get All Albums
    const addAlbums = await getAlbums(token);
    if (!addAlbums) {
      console.error('Failed to fetch albums.');
    }
    // 4. Test Get Album
    const addAlbum = await getAlbum(1, token);
    if (!addAlbum) {
      console.error('Failed to fetch album data.');
    }
  
    // 5. Test Update Album
    const updatedAlbum = await patchAlbum(1, token, 'Updated Title', null, 4);
    if (!updatedAlbum) {
      console.error('Failed to update album.');
    }

    // 6. Test Delete Album
    const deletedAlbum = await deleteAlbum(1, token);
    if (!deletedAlbum) {
      console.error('Failed to delete album.');
    }
  }
  
  async function runSongTests() {

    // 1. Test Login
    const token = await loginToken('test', 'test');
    if (!token) {
      console.error('Failed to log in.');
    }

    // 2. Test Create Song
    const createSong = await postSong(2, token, 'Test Song', 'This is a test description', 3);
    if (!createSong) {
      console.error('Failed to create song.');
    }

    // 3. Test Get Song
    const song = await getSong(2, token);
    if (!song) {
      console.error('Failed to fetch song data.');
    }
  
    // 4. Test Update Song
    const updatedSong = await patchSong(1, token, 'Updated Test Song', null, null);
    if (!updatedSong) {
      console.error('Failed to update song.');
    }
  
    // 5. Test Get All Songs
    const allSongs = await getSongs(token);
    if (!allSongs) {
      console.error('Failed to fetch all songs.');
    }
  
    // 6. Test Delete Song
    const deletedSong = await deleteSong(2, token);
    if (!deletedSong) {
      console.error('Failed to delete song.');
    }
  }
  
  // Run the tests
  runSongTests()