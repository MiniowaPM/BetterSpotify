<template>
  <div class="album-detail">
    <div class="album-header">
      <img :src="album.cover" alt="Album cover" class="album-cover" />
      <div class="album-text">
        <h1>{{ album.title }}</h1>
        <p class="artist">{{ album.artist }}</p>
        <p class="genre">{{ album.genre }}</p>
      </div>
    </div>
    
    <div class="album-content">
      <div class="album-description">
        <h3>Description</h3>
        <p>{{ album.description }}</p>
      </div>

      <div class="album-length-section">
        <p class="album-length">Total Album Length: {{ albumLength }}</p>
      </div>

      <div class="album-songs">
        <h3>Songs</h3>
        <ul>
          <li v-for="(song, index) in album.songs" :key="index" class="song">
            <span>{{ song.title }}</span>
            <div class="song-actions">
              <span class="song-length">{{ song.length }}</span>
              <button class="delete-song" @click="deleteSong(index)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </li>
          <li class="add-song" @click="addSong">
            <span class="add-song-text">+ Add New Song</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumDetail",
  props: ["albumId"],
  data() {
    return {
      album: {
        id: this.albumId,
        title: "Album One",
        artist: "Artist A",
        genre: "Rock",
        cover: "https://media.pitchfork.com/photos/6059f80bc72914c0c86e988d/1:1/w_320,c_limit/Parannoul:%20To%20See%20the%20Next%20Part%20of%20the%20Dream.jpeg",
        description: "Blahblah",
        songs: [
          { title: "Track 1", length: "3:30" },
          { title: "Track 2", length: "4:15" },
          { title: "Track 3", length: "2:50" },
        ],
      },
    };
  },
  computed: {
    albumLength() {
      const totalLength = this.album.songs.reduce((sum, song) => {
        const [minutes, seconds] = song.length.split(":").map(Number);
        return sum + minutes * 60 + seconds;
      }, 0);
      const minutes = Math.floor(totalLength / 60);
      const seconds = totalLength % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  methods: {
    deleteSong(index) {
      this.album.songs.splice(index, 1);
    },
    addSong() {
      this.album.songs.push({ title: "New Track", length: "0:00" });
    },
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

.artist, .genre {
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

.album-length-section {
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
}

.album-length {
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 25px;
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
  color: var(--primary-color);
  cursor: pointer;
  margin-top: 15px;
  transition: color 0.3s ease;
}

.add-song:hover {
  color: var(--contrast-color);
}

.add-song-text {
  font-weight: bold;
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
</style>