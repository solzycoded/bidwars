import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import CategoryView from "../views/CategoryView.vue"
import ItemView from "../views/ItemView.vue"

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
      path: "/live-auction/item/:name",
      name: "item-details",
      component: ItemView
    },
  ]
})

export default router
