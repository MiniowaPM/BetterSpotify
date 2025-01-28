<template>
  <aside class="sidebar">
    <div class="profile">
      <img 
        :src="logoImage" 
        alt="Logo" 
        class="logo" 
        @click="triggerFileInput"
      />
      <input 
        type="file" 
        ref="fileInput" 
        @change="handleFileChange" 
        style="display: none"
        accept="image/*"
      />
      <img
        :src="UserProfileImage"
        alt="User Avatar"
        class="avatar"
      />
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/">
            <div class="sidebar-content">Home</div>
          </router-link>
        </li>
        <li>
          <router-link to="/my-collection">
            <div class="sidebar-content">My Collection</div>
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="sidebar-content">Explore</div>
          </router-link>
        </li>
        <li>
          <router-link to="/currently-sold">
            <div class="sidebar-content">Selling</div>
          </router-link>
        </li>
        <li>
          <router-link to="/cart">
            <div class="sidebar-content">Cart</div>
          </router-link>
        </li>
        <li>
          <router-link to="/admin-panel">
            <div class="sidebar-content">Admin Panel</div>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="footer">
      <router-link to="/profile-settings">
        <button class="settings-button">
          <i class="fa-solid fa-gear" alt="Settings"></i>
        </button>
      </router-link>
      <button class="lightswitch-button" @click="toggleTheme">
        <i class="fa-solid fa-lightbulb" alt="Lightswitch"></i>
      </button>
    </div>
  </aside>
</template>

<script>
import { getUserImg, loginToken } from '@/utils/api_handler/user';

export default {
  name: "AppSidebar",
  data(){
    return {
      UserProfileImage: '',
      logoImage: require('@/assets/icon_onsite.png'),
    }
  },
  methods: {
    toggleTheme() {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.logoImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  },
  async mounted() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const TEMP_LOGIN = await loginToken("test","test")
    // const loginToken = JSON.parse(sessionStorage.getItem("loginToken")) # jak już będzie login screan to ez
    const UserProfileImageBinaryData = await getUserImg("me",TEMP_LOGIN) 
    this.UserProfileImage = `data:${UserProfileImageBinaryData.mime_type};base64,${UserProfileImageBinaryData.base64_data}`;
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0;
  z-index: 1000;
}

.profile {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 22px 22px;
  margin-bottom: 20px;
}

[data-theme="light"] .logo {
  filter: invert(85%);
}

.logo,
.avatar {
  width: 35px;
  height: auto;
}

.avatar {
  border-radius: 50%;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav li {
  text-align: left;
}

nav a {
  text-decoration: none;
  display: block;
  padding: 20px 30px;
  display: flex;
  transition: background-color 0.3s ease;
  border-radius: 5px;
}

nav a:hover {
  background-color: var(--background-hover-color);
}

.sidebar-content {
  color: var(--text-color);
  font-size: 20px;
  font-weight: 400;
  flex: auto;
}

.footer {
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.settings-button,
.lightswitch-button {
  color: var(--text-color);
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 6px;
  margin: 22px;
  display: flex;
  cursor: pointer;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  border-radius: 25px;
}

.settings-button:hover,
.lightswitch-button:hover {
  background-color: var(--background-hover-color);
}
</style>
