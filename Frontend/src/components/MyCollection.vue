<template>
    <div class="my-collection">
      <h1>My Collection</h1>
      <p>Explore the albums from your favorite studios.</p>
      
      <div class="studios">
        <div v-for="(studio, index) in studios" :key="index" class="studio">
          <h2>{{ studio.name }}</h2>
          <p>{{ studio.description }}</p>
          <div class="albums">
            <div v-for="(album, idx) in studio.albums" :key="idx" class="album">
              <img :src="album.cover" alt="Album cover" class="album-cover" />
              <h3>{{ album.title }}</h3>
              <p>{{ album.artist }}</p>
            </div>
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
        studios: [
          {
            name: "Studio A",
            description: "A renowned studio known for classic albums.",
            albums: [
              {
                title: "Album One",
                artist: "Artist One",
                cover: "https://media.pitchfork.com/photos/6059f80bc72914c0c86e988d/1:1/w_320,c_limit/Parannoul:%20To%20See%20the%20Next%20Part%20of%20the%20Dream.jpeg"
              },
              {
                title: "Album Two",
                artist: "Artist Two",
                cover: "https://cdn-images.dzcdn.net/images/cover/6c6b734cfccf2c1974d2499e0b7f3bd7/500x500-000000-80-0-0.jpg"
              }
            ]
          },
          {
            name: "Studio B",
            description: "A popular studio for modern releases.",
            albums: [
              {
                title: "Album Three",
                artist: "Artist Three",
                cover: "https://ecsmedia.pl/cdn-cgi/image/format=webp,width=544,height=544,/c/deathcore-b-iext146494804.jpg"
              },
              {
                title: "Album Four",
                artist: "Artist Four",
                cover: "https://cdn-images.dzcdn.net/images/cover/e1b2f02261e3b0c398d7efa866530967/500x500-000000-80-0-0.jpg"
              }
            ]
          },
          {
            name: "Studio C",
            description: "An experimental studio pushing the boundaries of sound.",
            albums: [
              {
                title: "Album Five",
                artist: "Artist Five",
                cover: "https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png"
              },
              {
                title: "Album Six",
                artist: "Artist Six",
                cover: "https://i.ebayimg.com/images/g/EyQAAOSwEK9TvDlv/s-l1600.webp"
              }
            ]
          },
          {
            name: "Studio D",
            description: "A boutique studio focusing on indie artists.",
            albums: [
              {
                title: "Album Seven",
                artist: "Artist Seven",
                cover: "https://fiu-original.b-cdn.net/fontsinuse.com/use-images/107/107559/107559.jpeg?filename=I%27m%20In%20Your%20Mind%20Fuzz.jpg"
              },
              {
                title: "Album Eight",
                artist: "Artist Eight",
                cover: "https://cdn.prod.website-files.com/6646ddea6f7841c79d11cbc6/6646ddea6f7841c79d11cc04_polygondwanaland-small2.jpg"
              }
            ]
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .my-collection {
    padding: 20px;
    text-align: center;
    color: #fffafa;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
  
  .studios {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
  
  .studio {
    background-color: #202022;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .studio h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  
  .studio p {
    font-size: 1rem;
    color: #d3d3d3;
    margin-bottom: 20px;
  }
  
  .albums {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .album {
    background-color: #171719;
    padding: 10px;
    border-radius: 10px;
    width: 150px;
    text-align: center;
  }
  
  .album-cover {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .album h3 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  .album p {
    font-size: 1rem;
    color: #d3d3d3;
  }
  </style>
  