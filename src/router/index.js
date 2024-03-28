import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ItemView from "../views/ItemView.vue";
import RoomView from "../views/RoomView.vue";
import ProfileView from "../views/ProfileView.vue";
import SellAnItemView from "../views/SellAnItemView.vue";

import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

import DashboardView from "../views/DashboardView.vue";

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
    {
      path: "/profile",
      name: "profile",
      component: ProfileView
    },
    {
      path: "/sell-an-item",
      name: "sell_an_item",
      component: SellAnItemView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView
    },
  ]
})

export default router
