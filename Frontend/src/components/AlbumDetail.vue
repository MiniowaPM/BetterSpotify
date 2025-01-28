<template>
  <div class="album-detail">
    <div class="album-header">
      <img :src="album.cover" alt="Album cover" class="album-cover" />
      <div class="album-text">
        <h1>{{ album.title }}</h1>
        <p class="artist">{{ album.artist }}</p>
        <p class="genre">{{ album.genre }}</p>
        <p class="length">{{ albumLength }}</p>
      </div>
    </div>

    <div class="album-description">
      <h3>Description</h3>
      <p>{{ album.description }}</p>
    </div>

    <div class="album-content">
      <div class="album-songs">
        <h3>Songs</h3>
        <ul>
          <li v-for="(song, index) in album.songs" :key="index" class="song">
            <span>{{ song.title }}</span>
            <div class="song-actions">
              <span class="song-length">{{ formatDuration(song.length) }}</span>
              <button class="delete-song" @click="dropSong(index)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </li>
          <li class="add-song">
            <span class="add-song-text" @click="showAddSongModal"
              >+ Add New Song</span
            >
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isModalVisible" class="modal-backdrop">
      <div class="modal">
        <h3 class="modal-title">Add New Song</h3>
        <div class="modal-inputs">
          <label for="newSongTitle">Title</label>
          <input
            id="newSongTitle"
            v-model="newSongTitle"
            placeholder="Enter song title"
          />
          <label for="newSongDuration">Duration</label>
          <input
            id="newSongDuration"
            v-model="newSongDuration"
            placeholder="MM:SS"
          />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div class="modal-actions">
          <button class="modal-button save" @click="addSong">Save</button>
          <button class="modal-button cancel" @click="hideAddSongModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumImg } from '@/utils/api_handler/album';
import { deleteSong, getSongsInAlbum, postSong } from '@/utils/api_handler/song';

export default {
  name: "AlbumDetail",
  props: ["albumId"],
  data() {
    return {
      album: {
        id: this.albumId,
        title: '',
        artist: '',
        genre: '',
        cover:
          "https://media.pitchfork.com/photos/6059f80bc72914c0c86e988d/1:1/w_320,c_limit/Parannoul:%20To%20See%20the%20Next%20Part%20of%20the%20Dream.jpeg",
        description: '',
        songs: [],
      },
      isModalVisible: false,
      newSongTitle: "",
      newSongDuration: "",
      errorMessage: "",
    };
  },
  computed: {
    albumLength() {
      const totalLength = this.album.songs.reduce((sum, song) => sum + song.length, 0);
      const minutes = Math.floor(totalLength/60);
      const seconds = totalLength % 60;

      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },
  methods: {
    async featchAlbumData(){
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      const SongsInAlbum = await getSongsInAlbum(this.albumId, loginToken);
      this.album = SongsInAlbum;
      const AlbumThumbnail = await getAlbumImg(this.albumId,loginToken)
      this.album.cover = `data:${AlbumThumbnail.mime_type};base64,${AlbumThumbnail.base64_data}`;
    },
    async dropSong(index) {
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      await deleteSong(this.album.songs[index].id, loginToken);
      this.featchAlbumData();
    },
    showAddSongModal() {
      this.isModalVisible = true;
      this.errorMessage = "";
    },
    hideAddSongModal() {
      this.isModalVisible = false;
      this.newSongTitle = "";
      this.newSongDuration = "";
      this.errorMessage = "";
    },
    addSong() {
      if (!this.newSongTitle.trim()) {
        this.errorMessage = "Song title is required.";
        return;
      }
      if (!this.newSongDuration.match(/^\d{1,2}:\d{2}$/)) {
        this.errorMessage = "Duration must be in MM:SS format.";
        return;
      }

      const [minutes,seconds] = this.newSongDuration.split(":").map(Number);
      const durationInSeconds = minutes * 60 + seconds;

      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      postSong(this.albumId, loginToken, this.newSongTitle.trim(), durationInSeconds) // DOTO: Fix newSongDuration string 10:10 to int
        .then(()=>{
          this.featchAlbumData();
          this.hideAddSongModal();
        })
    },
    formatDuration(duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },
  async mounted(){
    this.featchAlbumData()
  },
};
</script>

<style scoped>
.album-detail {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  color: var(--text-color);
}

.album-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.album-cover {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  margin-right: 20px;
}

.album-text {
  margin-left: 20px;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
}

.artist,
.genre,
.length {
  font-size: 1.2rem;
  color: var(--second-text-color);
}

.album-content {
  border: 1px solid var(--background-hover-color);
  padding: 30px;
  border-radius: 15px;
  background-color: var(--background-second-color);
}

.album-description {
  text-align: center;
  margin-bottom: 20px;
}

.album-description h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.album-description p {
  font-size: 1.1rem;
  line-height: 1.5;
}

.album-songs h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.song {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.song-length {
  color: var(--second-text-color);
}

.add-song {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  margin-top: 15px;
}

.add-song-text {
  color: var(--primary-color);
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;
}

.add-song-text:hover {
  color: var(--contrast-color);
}

.song-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.delete-song {
  background-color: transparent;
  border: none;
  color: var(--second-text-color);
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.delete-song i {
  width: 10px;
  height: 10px;
  font-size: 0.8rem;
}

.delete-song:hover {
  color: var(--contrast-color);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background-color: var(--background-second-color);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-color);
}

.modal-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-inputs label {
  text-align: center;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--text-color);
}

.modal-inputs input {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  font-size: 1.1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  outline: none;
  text-align: center;
}

.modal-inputs input:focus {
  border-color: var(--contrast-color);
}

.error-message {
  color: var(--second-text-color);
  font-size: 1rem;
  margin-top: 20px;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-button {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 48%;
}

.modal-button.cancel,
.modal-button.save {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--background-hover-color);
}

.modal-button:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-button.cancel:hover,
.modal-button.save:hover {
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}
</style>
