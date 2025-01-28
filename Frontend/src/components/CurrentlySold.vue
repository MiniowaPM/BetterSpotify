<template>
  <div class="currently-sold">
    <h1>{{ studio.name }}'s Albums for sale</h1>
    <p>Take a look at your albums currently for sale</p>
    <div class="albums">
      <div v-for="(album, idx) in studio.albums" :key="idx" class="album">
        <img :src="album.cover" alt="Album cover" class="album-cover" />
        <h3>{{ album.title }}</h3>
        <p class="artist-text">{{ album.artist }}</p>
        <div class="album-footer">
          <span class="price">{{ album.price }}zł</span>
          <span class="separator">
            <i class="fa-solid fa-circle-small"></i>
          </span>
          <span
            @click="removeAlbum(album)"
            class="trash-icon"
            :title="'Remove album from sale'"
          >
            <i class="fa-regular fa-trash-can"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumImg, getMyCollection} from "@/utils/api_handler/album";

export default {
  name: "CurrentlySold",
  data() {
    return {
      studio: {
        name: sessionStorage.getItem("StudioName"),
        albums: [],
      },
    };
  },
  methods: {
    async fetchAlbumsData(){
      const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
      var myCollectionData = await getMyCollection(loginToken);

      this.studio.albums = await Promise.all(
        myCollectionData.map(async (album) => {
          try {
            const albumImage = await getAlbumImg(album.id, loginToken);
            return {
              artist: album.artist,
              id: album.id,
              title: album.title,
              releaseDate: album.release_date.slice(0, 4),
              cover: `data:${albumImage.mime_type};base64,${albumImage.base64_data}`,
            };
          } catch (error) {
            console.error(
              `Failed to fetch image for album ID ${album.id}:`,
              error
            );
            return {
              artist: album.artist,
              id: album.id,
              title: album.title,
              releaseDate: album.release_date,
              cover: null,
            };
          }
        })
      );
    },
    removeAlbum(album) {
      console.log(album);
    },
  },
  mounted(){
    this.fetchAlbumsData();
  }
};
</script>

<style scoped>
.currently-sold {
  padding: 20px;
  text-align: center;
  color: var(--text-color);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.albums {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  justify-items: center;
}

.album {
  background-color: var(--background-second-color);
  padding: 10px;
  border-radius: 10px;
  width: 150px;
  height: 255px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--background-hover-color);
}

.album-cover {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 8px;
}

.album h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.artist-text {
  font-size: 1rem;
  color: var(--second-text-color);
}

.album:hover {
  background-color: var(--background-color);
}

.album-footer {
  font-size: 0.9rem;
  margin-top: 10px;
  color: var(--second-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text-color);
}

.trash-icon {
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.trash-icon:hover {
  color: var(--primary-color);
}

.separator {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  margin: 0 8px;
}

.separator i {
  font-size: 7px;
  width: 7px;
  height: 7px;
  display: inline-block;
}
</style>
