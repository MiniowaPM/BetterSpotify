<template>
  <div class="explore-market">
    <h1>Explore Studios</h1>
    <p>Select a studio to browse its albums.</p>
    <div class="studios">
      <div
        v-for="(studio, idx) in studios"
        :key="idx"
        class="studio"
        @click="selectStudio(studio)"
      >
        <img src="../assets/music_studios.png" alt="Studio logo" class="studio-logo" />
        <h3>{{ studio.name }}</h3>
        <p class="studio-description">Album count: {{ studio.albumCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getStudio } from "@/utils/api_handler/album";

export default {
  name: "ExploreMarket",
  data() {
    return {
      studios: [
        {
          id: "",
          name: "",
          albumCount: "",
        },
      ],
    };
  },
  methods: {
    async fetchData(){
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'))
      const Studio_data = await getStudio(loginToken)
      this.studios = Studio_data.map((album)=>({
        id: album.id,
        name: album.studio,
        albumCount : album.album_count
      }))
    },
    selectStudio(studio) {
      this.$router.push({
        name: "ExploreAlbums",
        params: { studioId: studio.id },
      });
    },
  },
  mounted(){
    this.fetchData();
  },
};
</script>

<style scoped>
[data-theme="light"] .studio-logo {
  filter: invert(100%);
}

.explore-market {
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

.user-balance {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.studios {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  flex-wrap: wrap;
  justify-items: center;
}

.studio {
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

.studio-logo {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 8px;
}

.studio h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.studio-description {
  font-size: 1rem;
  color: var(--second-text-color);
}

.studio:hover {
  background-color: var(--background-color);
}
</style>
