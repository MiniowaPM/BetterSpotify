import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import MyCollection from "../components/MyCollection.vue"; 
import ExploreMarket from "../components/ExploreMarket.vue";
import ExploreAlbums from "../components/ExploreAlbums.vue";
import MyCart from "../components/MyCart.vue";

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
  },
  {
    path: "/explore/:studioName/",
    name: "ExploreAlbums",
    component: ExploreAlbums,
    props: true,
  },
  {
    path: "/cart",
    name: "MyCart",
    component: MyCart,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;