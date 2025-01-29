<template>
  <div class="homepage">
    <img
      :src="UserProfileImage"
      alt="User Avatar"
      class="avatarhome"
    />
    <h1 class="welcome">{{ $t('welcome', { username: Username }) }}</h1>
    <p class="msg">{{ $t('studioMessage', { studioName: StudioName }) }}</p>
    <div class="features">
      <div class="feature">
        <router-link to="/my-collection">
          <i class="fa-solid fa-book"></i>
          <h2>{{ $t('myCollection') }}</h2>
          <p class="description">{{ $t('myCollectionDesc') }}</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/explore">
          <i class="fa-solid fa-music"></i>
          <h2>{{ $t('explore') }}</h2>
          <p class="description">{{ $t('exploreDesc') }}</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/cart">
          <i class="fa-solid fa-cart-shopping-fast"></i>
          <h2>{{ $t('cart') }}</h2>
          <p class="description">{{ $t('cartDesc') }}</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/currently-sold">
          <i class="fa-solid fa-cart-circle-arrow-up"></i>
          <h2>{{ $t('currentlySold') }}</h2>
          <p class="description">{{ $t('currentlySoldDesc') }}</p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/profile-settings">
          <i class="fa-solid fa-cog"></i>
          <h2>{{ $t('settings') }}</h2>
          <p class="description">{{ $t('settingsDesc') }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoggedUser, getUserImg } from '@/utils/api_handler/user';

export default {
  data() {
    return {
      name: "HomePage",
      UserProfileImage: '',
      Username: '',
      StudioName: sessionStorage.getItem('StudioName')
    };
  },
async mounted(){
  try{
    const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
    const HomePageData = await getLoggedUser(loginToken);
    this.Username = HomePageData.username;
    this.StudioName = HomePageData.studio_name;
    sessionStorage.setItem('StudioName', this.StudioName);
    const UserProfileImageBinaryData = await getUserImg('me', loginToken);
    this.UserProfileImage = `data:${UserProfileImageBinaryData.mime_type};base64,${UserProfileImageBinaryData.base64_data}`;
  } catch (error) {
    console.error('Error fetching user data:', error);  
    }
  }
}
</script>

<style scoped>
.avatarhome {
  border-radius: 50%;
  width: 75px;
  height: auto;
}

.homepage {
  padding: 20px;
  text-align: center;
  color: var(--text-color);
}

.welcome {
  font-size: 2.5rem;
  margin-top: 15px;
  margin-bottom: 20px;
}

.msg,
.description {
  font-size: 1.2rem;
}

.msg {
  margin-bottom: 24px;
}

.description {
  margin-bottom: 20px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.feature {
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.feature i {
  margin-top: 10px;
  font-size: 2rem;
  color: var(--contrast-color);
  margin-bottom: 10px;
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1rem;
  color: var(--second-text-color);
}

.feature a {
  text-decoration: none;
  color: var(--text-color);
}
</style>
