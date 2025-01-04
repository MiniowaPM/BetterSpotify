<template>
  <div class="container">
    <AppSidebar />
    <main class="main-content">
      <AppTopbar />
      <div class="content">
      </div>
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
  font-family: "Hanken Grotesk", serif;
  user-select: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
}

body {
  background-color: #202022;
  color: #fffafa;
  height: 100vh;
  display: flex;
}

.container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #171719;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20px;
  color: #fffafa;
  flex: 1;
}
</style>
