<template>
  <div class="my-collection">
    <h1>{{ $t('albums', { studioName: studio.name }) }}</h1>
    <p>{{ $t('browseAlbums') }}</p>
    <button class="toggle-button" @click="toggleFavoritesView">
      {{ showFavoritesOnly ? $t('showAllAlbums') : $t('showFavorites') }}
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
          <button v-if="isAdmin"
            class="sell-button"
            @click.stop="showSellAlbumModal(album)"
            :title="$t('sellAlbum')"
          >
            <i class="fa-solid fa-dollar-sign"></i>
          </button>
          <span v-if="isAdmin" class="separator">
            <i class="fa-solid fa-circle-small"></i>
          </span>
          <span>
            <i
              :class="
                isFavorite(album) ? 'fa-solid fa-star' : 'fa-regular fa-star'
              "
              class="star-icon"
              :title="isFavorite(album) ? $t('removeFromFavorites') : $t('addToFavorites')"
              @click.stop="toggleFavorite(album)"
            ></i>
          </span>
          <span class="separator" v-if="isAdmin">
            <i class="fa-solid fa-circle-small"></i>
          </span>
          <button v-if="isAdmin"
            class="remove-button"
            @click.stop="removeAlbum(album)"
            :title="$t('removeAlbum')"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="album add-album" @click="showAddAlbumModal">
        <div class="add-album-content">
          <i class="fa-duotone fa-light fa-plus add-icon"></i>
          <p class="add-text">{{ $t('addAlbum') }}</p>
        </div>
      </div>
    </div>

    <div v-if="isSellModalVisible" class="modal-backdrop">
      <div class="modal">
        <h3 class="modal-title">{{ $t('sellAlbumModalTitle') }}</h3>
        <p>{{ $t('enterPrice') }}</p>
        <div class="modal-inputs">
          <input
            id="sellPrice"
            v-model="sellPrice"
            type="number"
            :placeholder="$t('sellPricePlaceholder')"
          />
        </div>
        <p v-if="sellErrorMessage" class="error-message">{{ sellErrorMessage }}</p>
        <div class="modal-actions">
          <button class="modal-button save" @click="confirmSellAlbum">{{ $t('save') }}</button>
          <button class="modal-button cancel" @click="hideSellAlbumModal">
            {{ $t('cancel') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="isModalVisible" class="modal-backdrop">
      <div class="modal">
        <h3 class="modal-title">{{ $t('addNewAlbum') }}</h3>
        <div class="modal-inputs">
          <label for="albumTitle">{{ $t('albumTitle') }}</label>
          <input
            id="albumTitle"
            v-model="newAlbum.title"
            :placeholder="$t('albumTitle')"
          />
          <label for="albumArtist">{{ $t('albumArtist') }}</label>
          <input
            id="albumArtist"
            v-model="newAlbum.artist"
            :placeholder="$t('albumArtist')"
          />
          <label for="albumCover">{{ $t('albumCover') }}</label>
          <div @click="triggerFileInput" class="custom-file-label">{{ $t('uploadCoverImage') }}</div>
          <input
            id="albumCover"
            type="file"
            accept="image/png, image/jpeg"
            @change="handleFileUpload"
          />
          <p v-if="coverErrorMessage" class="error-message">{{ coverErrorMessage }}</p>
          <div v-if="newAlbum.cover" class="cover-preview">
            <img :src="newAlbum.cover" alt="{{ $t('coverPreview') }}" />
          </div>
          <label for="albumReleaseDate">{{ $t('albumReleaseDate') }}</label>
          <input
            id="albumReleaseDate"
            type="date"
            v-model="newAlbum.releaseDate"
            :placeholder="$t('albumReleaseDate')"
          />
          <label for="albumGenre">{{ $t('albumGenre') }}</label>
          <select id="albumGenre" v-model="newAlbum.genre" class="genre-select">
            <option
              v-for="(genre, index) in genres"
              :key="index"
              :value="index + 1"
            >
              {{ genre }}
            </option>
          </select>
          <label for="albumDescription">{{ $t('albumDescription') }}</label>
          <textarea
            id="albumDescription"
            v-model="newAlbum.description"
            :placeholder="$t('albumDescription')"
          ></textarea>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <div class="modal-actions">
          <button class="modal-button save" @click="addAlbum">{{ $t('save') }}</button>
          <button class="modal-button cancel" @click="hideAddAlbumModal">
            {{ $t('cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumImg, getMyCollection, patchAlbum, postAlbum, postAlbumImg, deleteAlbum } from "@/utils/api_handler/album";

export default {
  name: "MyCollection",
  data() {
    return {
      studio: {
        name: sessionStorage.getItem("StudioName"),
        albums: [],
      },
      genres: [
      "Pop", "Rock", "Jazz", "Classical", "HipHop", "RnB", "Reggae", 
      "Country", "Blues", "Electronic", "Folk", "Metal", "Soul", "Funk", 
      "Punk", "Disco", "Gospel", "House", "Techno", "Trance", "Dubstep", 
      "Ambient", "Indie", "KPop", "JPop", "Latin", "Salsa", "Bachata", 
      "Reggaeton", "Afrobeat", "Ska", "Grunge", "Alternative", "Emo", 
      "ProgressiveRock", "SymphonicMetal", "PostRock", "Noise", 
      "Experimental", "GarageRock", "Hardcore", "Industrial", "NewWave", 
      "SynthPop", "LoFi", "TripHop", "Chillwave", "Vaporwave", "Shoegaze", 
      "DreamPop", "PsychedelicRock", "Psytrance", "Hardstyle", "DrumAndBass", 
      "Breakbeat", "Glitch", "EDM", "Dancehall", "Trap", "Grime", "Drill", 
      "Dub", "Moombahton", "TropicalHouse", "FutureBass", "BigRoom", 
      "Electropop", "Electroswing", "Baroque", "Opera", "Choral", 
      "Minimalism", "ContemporaryClassical", "March", "Soundtrack", 
      "MusicalTheatre", "AvantGarde", "SpokenWord", "World", "Celtic", 
      "Flamenco", "MiddleEastern", "Bollywood", "Tango", "BossaNova", 
      "Samba", "Zydeco", "Cajun", "Bluegrass", "Americana", "Roots", 
      "Chillout", "Meditation", "Workout", "Holiday", "ChildrensMusic", 
      "Acapella", "Mashup", "Covers", "Parody"
      ],
      favorites: [],
      showFavoritesOnly: false,
      isModalVisible: false,
      newAlbum: {
        title: "",
        artist: "",
        releaseDate: "",
        cover: "",
        genre: 1,
        description: "",
      },
      errorMessage: "",
      coverErrorMessage: "",
      isSellModalVisible: false,
      sellPrice: null,
      sellErrorMessage: "",
    };
  },
  computed: {
    displayedAlbums() {
      return this.showFavoritesOnly ? this.favorites : this.studio.albums;
    },
  },
  methods: {
    async featchAlbumsData(){
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
    handleKeydown(event) {
      if (event.ctrlKey && event.key === 'o') {
        event.preventDefault();
        this.showAddAlbumModal();
      }
    },
    triggerFileInput() {
      document.getElementById("albumCover").click();
    },
    showAddAlbumModal() {
      this.isModalVisible = true;
      this.errorMessage = "";
    },
    hideAddAlbumModal() {
      this.isModalVisible = false;
      this.newAlbum = {
        title: "",
        artist: "",
        cover: "",
        releaseDate: "",
        genre: 1,
        description: "",
      };
      this.errorMessage = "";
    },
    async addAlbum() {
      if (
        !this.newAlbum.title.trim() ||
        !this.newAlbum.artist.trim() ||
        !this.newAlbum.cover.trim() ||
        !this.newAlbum.releaseDate ||
        !this.newAlbum.genre ||
        !this.newAlbum.description.trim()
      ) {
        this.errorMessage = "All fields are required.";
        return;
      }
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      const postAlbumResponse = await postAlbum(loginToken, this.newAlbum.title, this.newAlbum.description, this.newAlbum.artist, this.newAlbum.releaseDate, this.newAlbum.genre);
      postAlbumImg(postAlbumResponse.id, loginToken, this.newAlbum.cover.trim());
      this.featchAlbumsData();
      this.hideAddAlbumModal();
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
        params: { albumId: album.id , albumTitle: album.title, albumArtist: album.artist, albumGenre: album.genre, albumDescription: album.description},
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
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = "Please upload a valid image (PNG or JPEG).";
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== img.height) {
            this.coverErrorMessage = "Please upload a square image.";
            this.newAlbum.cover = "";
          } else {
            this.newAlbum.cover = e.target.result; // Base64 string
            this.coverErrorMessage = "";
          }
        };
        img.onerror = () => {
          this.coverErrorMessage = "Invalid image file.";
        };
        img.src = e.target.result; 
      };
      reader.readAsDataURL(file);
    },
    showSellAlbumModal(album) {
      this.isSellModalVisible = true;
      this.selectedAlbum = album;
    },
    hideSellAlbumModal() {
      this.isSellModalVisible = false;
      this.sellPrice = null;
      this.sellErrorMessage = "";
    },
    async confirmSellAlbum() {
      if (!this.sellPrice || this.sellPrice <= 0) {
        this.sellErrorMessage = "Please enter a valid price.";
        return;
      } 
      alert(`Album "${this.selectedAlbum.title}" is being sold for ${this.sellPrice}zł`);
      const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
      await patchAlbum(this.selectedAlbum.id, loginToken, undefined, undefined, undefined, this.sellPrice, undefined);
      this.featchAlbumsData();
      this.hideSellAlbumModal();
    },
    async removeAlbum(album) {
      const confirmed = window.confirm(`Are you sure you want to delete the album "${album.title}"?`);
      if (confirmed) {
        const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
        await deleteAlbum(album.id, loginToken);
        await this.featchAlbumsData();
      }
    },
  },
  async mounted() {
    this.loadFavoritesFromLocalStorage();
    this.loadToggleStateFromLocalStorage();
    this.featchAlbumsData();
    
    window.addEventListener('keydown', this.handleKeydown);
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

.separator {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--second-text-color);
  margin: 0 8px;
}

.separator i {
  font-size: 7px;
  width: 7px;
  height: 7px;
  display: inline-block;
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
  overflow: hidden;
}

.modal {
  background-color: var(--background-second-color);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  max-height: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
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

.modal-inputs input,
.modal-inputs textarea {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  font-size: 1.1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  outline: none;
  text-align: center;
  resize: none;
}

.modal-inputs input:focus {
  border-color: var(--contrast-color);
}

#albumReleaseDate {
  color: var(--text-color);
  padding-left: 35px;
}

[data-theme="dark"] #albumReleaseDate::-webkit-calendar-picker-indicator {
  filter: invert(95%);
}

[data-theme="light"] #albumReleaseDate::-webkit-calendar-picker-indicator {
  filter: brightness(0) contrast(35%);
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

.genre-select {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  font-size: 1.1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  outline: none;
  text-align: center;
  appearance: none;
  cursor: pointer;
}

.genre-select:focus {
  border-color: var(--contrast-color);
}

.genre-select option {
  background-color: var(--background-color);
  color: var(--text-color);
}

input[type="file"] {
  display: none;
}

.custom-file-label {
  display: inline-block;
  padding: 10px 20px;
  font-family: "Hanken Grotesk", sans-serif;
  font-size: 1.1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.custom-file-label:hover {
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}

.custom-file-label:focus {
  outline: none;
  border-color: var(--contrast-color);
}

.cover-preview {
  margin-top: 15px;
  text-align: center;
}

.cover-preview img {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid var(--background-hover-color);
}

.sell-button {
  background: none;
  border: none;
  color: var(--second-text-color);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2px;
}

.sell-button:hover {
  color: var(--contrast-color);
}

.remove-button {
  background: transparent;
  border: none;
  color: var(--second-text-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.remove-button:hover {
  color: var(--contrast-color);
}

.remove-button i {
  font-size: 1rem;
}
</style>
