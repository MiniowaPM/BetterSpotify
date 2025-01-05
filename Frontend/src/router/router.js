import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/HomePage.vue"; // Adjust path if needed
import MyCollection from "../components/MyCollection.vue"; 
import ExploreMarket from "../components/ExploreMarket.vue";// Example additional page

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/my-collection",
    name: "MyCollection",
    component: MyCollection,
  },
  {
    path: "/explore",
    name: "ExploreMarket",
    component: ExploreMarket,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;