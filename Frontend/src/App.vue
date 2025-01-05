<template>
  <div class="container">
    <AppSidebar />
    <main class="main-content">
      <AppTopbar />
      <router-view/>
    </main>
  </div>
</template>

<script>
import AppSidebar from "./components/AppSidebar.vue";
import AppTopbar from "./components/AppTopbar.vue";

export default {
  name: "App",
  components: {
    AppSidebar,
    AppTopbar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-thin.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-solid.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-regular.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-light.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-thin.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-thin.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-regular.css');
@import url('https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-light.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

html,body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
}

body {
  font-family: "Hanken Grotesk", sans-serif;
  background-color: #202022;
  color: #fffafa;
  margin: 0;
}

main {
  position: absolute;
  top: 72px;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 20px;
  background-color: #121212;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.main-content {
  background-color: #171719;
}

.content {
  padding: 20px;
  color: #fffafa;
  flex: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: #202022;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #ff7f50;
  border-radius: 5px;
  border: 2px solid #202022;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ff5722;
}
</style>