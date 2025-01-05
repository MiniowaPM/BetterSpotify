<template>
  <div class="my-collection">
    <h1>{{ studio.name }}'s Albums</h1>
    <p>{{ studio.description }}</p>
    <div class="albums">
      <div v-for="(album, idx) in studio.albums" :key="idx" class="album">
        <img :src="album.cover" alt="Album cover" class="album-cover" />
        <h3>{{ album.title }}</h3>
        <p>{{ album.artist }}</p>
        <div class="album-footer">
          <span class="release-date">{{ album.releaseDate }}</span>
          <span class="separator">•</span>
          <span>
            <i class="fa-light fa-star"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCollection",
  data() {
    return {
      studio: {
        name: "Studio A",
        description: "Browse through your amazing albums.",
        albums: [
          {
            title: "Album One",
            artist: "Artist One",
            cover: "https://media.pitchfork.com/photos/6059f80bc72914c0c86e988d/1:1/w_320,c_limit/Parannoul:%20To%20See%20the%20Next%20Part%20of%20the%20Dream.jpeg",
            releaseDate: "2020",
          },
          {
            title: "Album Two",
            artist: "Artist Two",
            cover: "https://cdn-images.dzcdn.net/images/cover/6c6b734cfccf2c1974d2499e0b7f3bd7/500x500-000000-80-0-0.jpg",
            releaseDate: "2020",
          },
          {
            title: "Album Three",
            artist: "Artist Three",
            cover: "https://ecsmedia.pl/cdn-cgi/image/format=webp,width=544,height=544,/c/deathcore-b-iext146494804.jpg",
            releaseDate: "2020",
          },
          {
            title: "Album Four",
            artist: "Artist Four",
            cover: "https://cdn-images.dzcdn.net/images/cover/e1b2f02261e3b0c398d7efa866530967/500x500-000000-80-0-0.jpg",
            releaseDate: "2020",
          },
          {
            title: "Album Five",
            artist: "Artist Five",
            cover: "https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png",
            releaseDate: "2020",
          },
          {
            title: "Album Six",
            artist: "Artist Six",
            cover: "https://i.ebayimg.com/images/g/EyQAAOSwEK9TvDlv/s-l1600.webp",
            releaseDate: "2020",
          },
          {
            title: "Album Seven",
            artist: "Artist Seven",
            cover: "https://fiu-original.b-cdn.net/fontsinuse.com/use-images/107/107559/107559.jpeg?filename=I%27m%20In%20Your%20Mind%20Fuzz.jpg",
            releaseDate: "2020",
          },
          {
            title: "Album Eight",
            artist: "Artist Eight",
            cover: "https://cdn.prod.website-files.com/6646ddea6f7841c79d11cbc6/6646ddea6f7841c79d11cc04_polygondwanaland-small2.jpg",
            releaseDate: "2020",
          }
        ]
      }
    };
  }
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

.albums {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px,1fr));
  gap: 15px;
  flex-wrap: wrap;
  justify-items: center;
}

.album {
  background-color: var(--background-second-color);
  padding: 10px;
  border-radius: 10px;
  width: 150px;
  text-align: center;
  transition: background-color 0.3s ease;
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

.album p {
  font-size: 1rem;
  color: var(--second-text-color);
}

.album:hover {
  background-color: var(--background-hover-color);
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

.separator {
  margin: 0 8px;
}

.star-icon {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>