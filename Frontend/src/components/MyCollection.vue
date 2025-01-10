<template>
  <div class="my-collection">
    <h1>{{ studio.name }}'s Albums</h1>
    <p>Browse through your amazing albums.</p>
    <button class="toggle-button" @click="toggleFavoritesView">
      {{ showFavoritesOnly ? "Show All Albums" : "Show Favorites" }}
    </button>
    <div class="albums">
      <div
        v-for="(album, idx) in displayedAlbums"
        :key="idx"
        class="album"
        @click="viewAlbumDetail(album)"
      >
        <img :src="album.cover" alt="Album cover" class="album-cover" />
        <h3>{{ album.title }}</h3>
        <p class="artist-text">{{ album.artist }}</p>
        <div class="album-footer">
          <span class="release-date">{{ album.releaseDate }}</span>
          <span class="separator">•</span>
          <span>
            <i
              :class="
                isFavorite(album) ? 'fa-solid fa-star' : 'fa-regular fa-star'
              "
              class="star-icon"
              :title="
                isFavorite(album) ? 'Remove from favorites' : 'Add to favorites'
              "
              @click.stop="toggleFavorite(album)"
            ></i>
          </span>
        </div>
      </div>
      <div class="album add-album" @click="addAlbum">
        <div class="add-album-content">
          <i class="fa-duotone fa-light fa-plus add-icon"></i>
          <p class="add-text">Add Album</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumImg, getMyCollection } from '@/utils/api_handler/album';

export default {
  name: "MyCollection",
  data() {
    return {
      studio: {
        name: sessionStorage.getItem('StudioName'),
        albums: [],
      },
      favorites: [],
      showFavoritesOnly: false,
    };
  },
  computed: {
    displayedAlbums() {
      return this.showFavoritesOnly ? this.favorites : this.studio.albums;
    },
  },
  methods: {
    addAlbum() {
      console.log("Add album func");
    },
    toggleFavorite(album) {
      const index = this.favorites.findIndex(
        (fav) => fav.title === album.title
      );
      if (index === -1) {
        this.favorites.push(album);
      } else {
        this.favorites.splice(index, 1);
      }
      this.saveFavoritesToLocalStorage();
    },
    isFavorite(album) {
      return this.favorites.some((fav) => fav.title === album.title);
    },
    toggleFavoritesView() {
      this.showFavoritesOnly = !this.showFavoritesOnly;
      this.saveToggleStateToLocalStorage();
    },
    viewAlbumDetail(album) {
      this.$router.push({
        name: "AlbumDetail",
        params: { albumId: album.title },
      });
    },
    saveFavoritesToLocalStorage() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    loadFavoritesFromLocalStorage() {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    },
    saveToggleStateToLocalStorage() {
      localStorage.setItem(
        "showFavoritesOnly",
        JSON.stringify(this.showFavoritesOnly)
      );
    },
    loadToggleStateFromLocalStorage() {
      const storedToggleState = localStorage.getItem("showFavoritesOnly");
      if (storedToggleState !== null) {
        this.showFavoritesOnly = JSON.parse(storedToggleState);
      }
    },
  },
  async mounted() {
    this.loadFavoritesFromLocalStorage();
    this.loadToggleStateFromLocalStorage();
    // GET DATA
    const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
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
                    console.error(`Failed to fetch image for album ID ${album.id}:`, error);
                    return {
                        artist: album.artist,
                        id: album.id,
                        title: album.title,
                        releaseDate: album.release_date,
                        cover: null,
                    };
                  }
    }));
  },
};
</script>

<style scoped>
.my-collection {
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

.toggle-button {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px 20px;
  margin-bottom: 15px;
  background-color: var(--background-second-color);
  color: var(--second-text-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}

.toggle-button:active {
  transform: scale(0.98);
}

.albums {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  flex-wrap: wrap;
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

.release-date {
  font-size: 0.9rem;
}

.star-icon {
  cursor: pointer;
}

.separator {
  margin: 0 8px;
}

.add-album {
  background-color: var(--background-second-color);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-album:hover {
  background-color: var(--background-color);
}

.add-album-content {
  text-align: center;
}

.add-icon {
  font-size: 2rem;
  color: var(--text-color);
}

.add-text {
  font-size: 1rem;
  color: var(--text-color);
  margin-top: 8px;
}
</style>
