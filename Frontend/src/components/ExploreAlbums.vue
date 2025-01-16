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
  created() {
    this.getStudioDetails(this.studio.id);
  },
  methods: {
    getStudioDetails(studioId) {
      const studiosData = {
        1: {
          name: "Studio A",
          description: "Browse albums from Studio A.",
          albums: this.getAlbumsByStudio(1),
        },
        2: {
          name: "Studio B",
          description: "Browse albums from Studio B.",
          albums: this.getAlbumsByStudio(2),
        },
        3: {
          name: "Studio C",
          description: "Browse albums from Studio C.",
          albums: this.getAlbumsByStudio(3),
        },
        4: {
          name: "Studio D",
          description: "Browse albums from Studio D.",
          albums: this.getAlbumsByStudio(4),
        },
        5: {
          name: "Studio E",
          description: "Browse albums from Studio E.",
          albums: this.getAlbumsByStudio(5),
        },
      };

      this.studio = studiosData[studioId] || {
        name: "Unknown Studio",
        description: "",
        albums: [],
      };
    },
    getAlbumsByStudio(studioId) {
      const albumsData = {
        1: [
          {
            id: "1",
            title: "Album One",
            artist: "Artist A",
            cover:
              "https://media.pitchfork.com/photos/6059f80bc72914c0c86e988d/1:1/w_320,c_limit/Parannoul:%20To%20See%20the%20Next%20Part%20of%20the%20Dream.jpeg",
            price: 14.99,
          },
          {
            id: "2",
            title: "Album Two",
            artist: "Artist B",
            cover:
              "https://upload.wikimedia.org/wikipedia/en/c/cc/Kraus_-_Path.jpg",
            price: 19.99,
          },
        ],
        2: [
          {
            id: "3",
            title: "Album Three",
            artist: "Artist C",
            cover:
              "https://upload.wikimedia.org/wikipedia/en/5/53/Decide_Djo.png",
            price: 12.99,
          },
        ],
      };

      return albumsData[studioId] || [];
    },
    addToCart(album) {
      this.$emit("add-to-cart", album);
    },
    isAlbumInCart(album) {
      return this.cart.some((item) => item.id === album.id);
    },
  },
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
