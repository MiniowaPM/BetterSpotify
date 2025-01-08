<template>
  <div class="album-detail">
    <h1>{{ album.title }}</h1>
    <h2>By {{ album.artist }}</h2>
    <img :src="album.cover" alt="Album cover" class="album-cover" />
    <p>Release Date: {{ album.releaseDate }}</p>

    <div class="songs">
      <h3>Songs</h3>
      <ul>
        <li v-for="(song, idx) in album.songs" :key="idx">
          {{ song.title }} - {{ song.duration }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumDetail",
  props: {
    albumId: String,
  },
  data() {
    return {
      // z databazy
      albums: [
        {
          title: "Album One",
          artist: "Artist One",
          cover:
            "https://media.pitchfork.com/photos/6059f80bc72914c0c86e988d/1:1/w_320,c_limit/Parannoul:%20To%20See%20the%20Next%20Part%20of%20the%20Dream.jpeg",
          releaseDate: "2020",
          songs: [
            { title: "Song 1", duration: "3:00" },
            { title: "Song 2", duration: "2:45" },
            { title: "Song 3", duration: "3:00" },
            { title: "Song 4", duration: "2:45" },
            { title: "Song 5", duration: "3:00" },
            { title: "Song 6", duration: "2:45" },
            { title: "Song 7", duration: "3:00" },
            { title: "Song 8", duration: "2:45" },
          ],
        },
      ],
    };
  },
  computed: {
    album() {
      return this.albums.find((album) => album.title === this.albumId);
    },
  },
};
</script>

<style scoped>
.album-detail {
  padding: 20px;
  text-align: center;
  color: var(--text-color);
}

.album-cover {
  width: 300px;
  height: auto;
  margin-bottom: 20px;
}

.songs ul {
  list-style: none;
  padding: 0;
}

.songs li {
  margin: 10px 0;
}
</style>
