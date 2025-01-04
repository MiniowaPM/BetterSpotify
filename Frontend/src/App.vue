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
* {
  user-select: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #202022;
  color: #ffffff;
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
