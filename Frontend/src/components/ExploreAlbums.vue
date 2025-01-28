<template>
  <div class="explore-albums">
    <h1>{{ studio.name }}'s Albums</h1>
    <p>{{ studio.description }}</p>
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
            @click="addToCart(album)"
            class="cart-icon"
            :class="{ disabled: isAlbumInCart(album) }"
            :title="
              isAlbumInCart(album) ? 'This album is already in your cart' : ''
            "
          >
          <i class="fa-regular fa-cart-circle-plus"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumImg, getAlbumsByStudio, getStudioName } from '@/utils/api_handler/album';

export default {
  name: "ExploreAlbums",
  props: ["cart"],
  data() {
    return {
      studio: {
        id: this.$route.params.studioId,
        name: "",
        description: "",
        albums: [],
      },
    };
  },
  methods: {
    async fetchAlbumData(){
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      const exploreAlbumsData = await getAlbumsByStudio(this.studio.id, loginToken);
      for (let album of exploreAlbumsData){
        const coverImage = await getAlbumImg(album.id, loginToken);
        album.cover = `data:${coverImage.mime_type};base64,${coverImage.base64_data}`;
      }
      this.studio.name = await getStudioName(this.studio.id, loginToken);
      this.studio.albums = exploreAlbumsData;
    },
    addToCart(album) {
      this.$emit("add-to-cart", album);
    },
    isAlbumInCart(album) {
      return this.cart.some((item) => item.id === album.id);
    },
  },
  mounted(){
    this.fetchAlbumData();
  }
};
</script>

<style scoped>
.explore-albums {
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

.cart-icon {
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.cart-icon:hover {
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

.album-footer .cart-icon.disabled {
  cursor: not-allowed;
  color: grey;
}
</style>
