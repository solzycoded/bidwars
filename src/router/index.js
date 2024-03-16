import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ItemView from "../views/ItemView.vue";
import RoomView from "../views/RoomView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/live-auction/category/:name",
      name: "category",
      component: CategoryView
    },
    {
      path: "/live-auction/items/live/:name",
      name: "item-details",
      component: ItemView
    },
    {
      path: "/live-auction/rooms/live/:name",
      name: "room",
      component: RoomView
    },
  ]
})

export default router
