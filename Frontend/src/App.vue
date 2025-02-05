<template>
  <div id="app">
    <div v-if="!isLoginPage" class="container">
      <AppSidebar />
      <main class="main-content">
        <AppTopbar />
        <router-view
          :cart="cart"
          @add-to-cart="addToCart"
          @remove-from-cart="removeFromCart"
          @clear-cart="clearCart"
        />
      </main>
    </div>
    <!-- For the login page, no sidebar or topbar -->
    <router-view v-if="isLoginPage" />
  </div>
</template>

<script>
import AppSidebar from "./components/AppSidebar.vue";
import AppTopbar from "./components/AppTopbar.vue";
import { ref, onMounted, computed } from "vue";  // <-- Importing 'computed' and 'onMounted' here
import { useRoute } from "vue-router";  // Importing the useRoute hook from 'vue-router'

export default {
  name: "App",
  components: {
    AppSidebar,
    AppTopbar,
  },
  setup() {
    const route = useRoute();  // Using the route hook

    // Computed property to check if we're on the login page
    const isLoginPage = computed(() => route.path === '/login');

    const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

    const saveCartToLocalStorage = () => {
      localStorage.setItem("cart", JSON.stringify(cart.value));
    };

    const addToCart = (album) => {
      const albumExists = cart.value.some((item) => item.title === album.title);
      if (!albumExists) {
        cart.value.push(album);
        saveCartToLocalStorage();
      }
    };

    const removeFromCart = (index) => {
      cart.value.splice(index, 1);
      saveCartToLocalStorage();
    };

    const clearCart = () => {
      cart.value = [];
      saveCartToLocalStorage();
    };

    onMounted(() => {
      saveCartToLocalStorage();
    });

    // Returning the necessary variables to the template
    return { cart, addToCart, removeFromCart, clearCart, isLoginPage };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-thin.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-solid.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-regular.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-duotone-light.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-thin.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-thin.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-regular.css");
@import url("https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone-light.css");

:root {
  --background-color: #202022;
  --background-second-color: #171719;
  --background-hover-color: #2a2a2d;
  --text-color: #fffafa;
  --second-text-color: #d3d3d3;
  --contrast-color: #ff7f50;
  --contrast-hover-color: #ff5722;
}

[data-theme="light"] {
  --background-color: #f2f2f2;
  --background-second-color: #e6e6e6;
  --background-hover-color: #dcdcdc;
  --text-color: #3a3a3a;
  --second-text-color: #6a6a6a;
  --contrast-color: #ff6f61;
  --contrast-hover-color: #e65a50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

#app {
  height: 100%;
  width: 100%;
}

body {
  font-family: "Hanken Grotesk", sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
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
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.main-content {
  background-color: var(--background-second-color);
}

.content {
  padding: 20px;
  color: var(--text-color);
  flex: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: var(--background-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--contrast-color);
  border-radius: 5px;
  border: 2px solid var(--background-color);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--contrast-hover-color);
}
</style>
