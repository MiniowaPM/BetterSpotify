import {
  loginToken,
  deleteUser,
  patchUser,
  getLoggedUser,
  getUsersInStudio,
  postUserImg,
  getUserImg,
  postInitUser,
  postUser,
} from './api_handler/user.js';

import {
  deleteAlbum,
  patchAlbum,
  getAlbum,
  postAlbum,
  postAlbumImg,
  getAlbumImg,
} from './api_handler/album.js';

import {
  deleteSong,
  patchSong,
  postSong,
} from './api_handler/song.js';

async function runUserTests() {
  const adminUsername = 'adminUser';
  const adminPasswordHash = 'hashedAdminPassword';
  const studioName = 'Test Studio';

  // 1. Test postInitUser (Create Admin User)
  const initUser = await postInitUser(adminUsername, adminPasswordHash, studioName);
  if (!initUser) {
    console.error('Failed to create admin user.');
    return;
  }
  console.log('Admin user created:', initUser);

  // 2. Test Login
  const token = await loginToken(adminUsername, adminPasswordHash);
  if (!token) {
    console.error('Failed to log in as admin user.');
    return;
  }
  console.log('Logged in as admin user.');

  // 3. Test Create User
  const createUser = await postUser('testUser', 'hashedPassword', token);
  if (!createUser) {
    console.error('Failed to create user.');
  } else {
    console.log('User created:', createUser);
  }

  // 4. Test Update User
  const updateUser = await patchUser('me', token, 'updatedUsername');
  if (!updateUser) {
    console.error('Failed to update user.');
  } else {
    console.log('User updated:', updateUser);
  }

  // 5. Test Get Logged User
  const loggedUser = await getLoggedUser(token);
  if (!loggedUser) {
    console.error('Failed to get logged user data.');
  } else {
    console.log('Logged user data:', loggedUser);
  }

  // 6. Test Get Users in Studio
  const studioUsers = await getUsersInStudio(token);
  if (!studioUsers) {
    console.error('Failed to get users in studio.');
  } else {
    console.log('Studio users:', studioUsers);
  }

  // 7. Test Delete User
  const deletedUser = await deleteUser(createUser.id, token);
  if (!deletedUser) {
    console.error('Failed to delete user.');
  } else {
    console.log('User deleted:', deletedUser);
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

  // 2. Test Create Album
  const createAlbum = await postAlbum(token, 'Test Album', 'Album description', 2025);
  if (!createAlbum) {
    console.error('Failed to create album');
  } else {
    console.log('Album created:', createAlbum);
  }

  // 4. Test Get Album by ID
  const album = await getAlbum(createAlbum.id, token);
  if (!album) {
    console.error('Failed to fetch album by ID.');
  } else {
    console.log('Album data:', album);
  }

  // 5. Test Update Album
  const updatedAlbum = await patchAlbum(createAlbum.id, token, 'Updated Album Title');
  if (!updatedAlbum) {
    console.error('Failed to update album.');
  } else {
    console.log('Album updated:', updatedAlbum);
  }

  // 6. Test Delete Album
  const deletedAlbum = await deleteAlbum(createAlbum.id, token);
  if (!deletedAlbum) {
    console.error('Failed to delete album.');
  } else {
    console.log('Album deleted:', deletedAlbum);
  }
}

async function runSongTests() {
  const login = 'test';
  const password = 'test';

  // 1. Test Login
  const token = await loginToken(login, password);
  if (!token) {
    console.error('Failed to log in.');
    return;
  }

  // 2. Test Create Song
  const createSong = await postSong(1, token, 'Test Song', 'Test description', 4);
  if (!createSong) {
    console.error('Failed to create song.');
  } else {
    console.log('Song created:', createSong);
  }

  // 3. Test Get Song by ID
  const song = await getSong(createSong.id, token);
  if (!song) {
    console.error('Failed to fetch song by ID.');
  } else {
    console.log('Song data:', song);
  }

  // 4. Test Update Song
  const updatedSong = await patchSong(createSong.id, token, 'Updated Song Title');
  if (!updatedSong) {
    console.error('Failed to update song.');
  } else {
    console.log('Song updated:', updatedSong);
  }

  // 5. Test Get All Songs
  const allSongs = await getSongs(token);
  if (!allSongs) {
    console.error('Failed to fetch all songs.');
  } else {
    console.log('All songs:', allSongs);
  }

  // 6. Test Delete Song
  const deletedSong = await deleteSong(createSong.id, token);
  if (!deletedSong) {
    console.error('Failed to delete song.');
  } else {
    console.log('Song deleted:', deletedSong);
  }
}

async function main() {
  console.log('Running User Tests...');
  await runUserTests();

  console.log('Running Album Tests...');
  await runAlbumTests();

  console.log('Running Song Tests...');
  await runSongTests();
}

main().catch((err) => console.error(`Error in main: ${err.message}`));
