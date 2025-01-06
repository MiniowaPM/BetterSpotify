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
            <span class="separator">•</span>
            <span @click="addToCart(album)" class="cart-icon" :class="{'disabled': isAlbumInCart(album)}" :title="isAlbumInCart(album) ? 'This album is already in your cart' : ''">
              <i class="fa-light fa-cart-plus"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: "ExploreAlbums",
    props: ["studioName","cart"],
    data() {
      return {
        studio: {
          name: this.studioName,
          description: `Browse albums from ${this.studioName}.`,
          albums: this.getAlbumsByStudio(this.studioName),
        },
      };
    },
    methods: {
      getAlbumsByStudio(studioName) {
        const albumsData = {
          "Studio A": [
            {
              title: "Album One",
              artist: "Artist A",
              cover: "https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png",
              price: 14.99,
            },
            {
              title: "Album Two",
              artist: "Artist B",
              cover: "https://upload.wikimedia.org/wikipedia/en/c/cc/Kraus_-_Path.jpg",
              price: 19.99,
            },
          ],
          "Studio B": [
            {
              title: "Album Three",
              artist: "Artist C",
              cover: "https://upload.wikimedia.org/wikipedia/en/5/53/Decide_Djo.png",
              price: 12.99,
            },
          ],
        };
        return albumsData[studioName] || [];
      },
      addToCart(album) {
        this.$emit('add-to-cart', album);
      },
      isAlbumInCart(album) {
      return this.cart.some(item => item.title === album.title);
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
    color: var(--primary-color);
  }
  
  .cart-icon {
    cursor: pointer;
    font-size: 1.2rem;
    margin-left: 8px;
    color: var(--text-color);
    transition: color 0.3s ease;
  }
  
  .cart-icon:hover {
    color: var(--primary-color);
  }
  
  .separator {
    margin: 0 8px;
  }

  .album-footer .cart-icon.disabled {
    cursor: not-allowed;
    color: grey;
  }
</style>  