<template>
  <aside class="sidebar">
    <div class="profile">
      <img src="../assets/icon_onsite.png" alt="Logo" class="logo" />
      <img src="../assets/profilepicture.jpg" alt="User Avatar" class="avatar" />
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/my-collection">My Collection</router-link></li>
        <li><router-link to="/new-releases">New Releases</router-link></li>
      </ul>
    </nav>
    <div class="footer">
      <button class="settings-button">
        <i class="fa-solid fa-gear" alt="Settings"></i>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AppSidebar",
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #202022;
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

.logo, .avatar {
  width: 35px;
  height: 35px;
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
  margin: 20px 0;
  text-align: left;
}

nav a {
  text-decoration: none;
  color: #fffafa;
  font-size: 20px;
  font-weight: 400;
  display: block;
  padding: 5px 10px;
}

nav a:hover {
  background-color: #2a2a2d;
  border-radius: 5px;
}

.footer {
  margin-top: auto;
  padding-top: 20px;
}

.settings-button {
  color: #fffafa;
  background: none;
  border: none;
  padding: 6px;
  margin-bottom: 15px;
  display: flex;
  cursor: pointer;
  font-size: 20px;
}
.settings-button:hover {
  background-color: #2a2a2d;
  border-radius: 25px;
}
</style>