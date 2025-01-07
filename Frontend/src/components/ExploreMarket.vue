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
        <img :src="studio.logo" alt="Studio logo" class="studio-logo" />
        <h3>{{ studio.name }}</h3>
        <p class="studio-description">{{ studio.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import musicStudioLogo from "../assets/music_studios.png";

export default {
  name: "ExploreMarket",
  data() {
    return {
      studios: [
        {
          name: "Studio A",
          description: "Explore music from Studio A.",
          logo: musicStudioLogo,
        },
        {
          name: "Studio B",
          description: "Explore music from Studio B.",
          logo: musicStudioLogo,
        },
        {
          name: "Studio C",
          description: "Explore music from Studio C.",
          logo: musicStudioLogo,
        },
        {
          name: "Studio D",
          description: "Explore music from Studio D.",
          logo: musicStudioLogo,
        },
        {
          name: "Studio E",
          description: "Explore music from Studio E.",
          logo: musicStudioLogo,
        },
      ],
    };
  },
  methods: {
    selectStudio(studio) {
      this.$router.push({
        name: "ExploreAlbums",
        params: { studioName: studio.name },
      });
    },
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
