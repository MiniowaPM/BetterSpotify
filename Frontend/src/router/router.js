import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import MyCollection from "../components/MyCollection.vue"; 
import ExploreMarket from "../components/ExploreMarket.vue";
import ExploreAlbums from "../components/ExploreAlbums.vue";
import MyCart from "../components/MyCart.vue";
import AlbumDetail from "../components/AlbumDetail.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import CurrentlySold from "@/components/CurrentlySold.vue";
import ProfileSettings from "@/components/ProfileSettings.vue";

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
    path: "/album/:albumId",
    name: "AlbumDetail",
    component: AlbumDetail,
    props: true,
  },
  {
    path: "/explore",
    name: "ExploreMarket",
    component: ExploreMarket,
  },
  {
    path: "/explore/:studioId/",
    name: "ExploreAlbums",
    component: ExploreAlbums,
    props: true,
  },
  {
    path: "/cart",
    name: "MyCart",
    component: MyCart,
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: AdminPanel,
  },
  {
    path: "/currently-sold",
    name: "CurrentlySold",
    component: CurrentlySold,
  },
  {
    path: "/profile-settings",
    name: "ProfileSettings",
    component: ProfileSettings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;