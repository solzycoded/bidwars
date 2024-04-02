<script setup>
import LiveAuctionCategory from './Card.vue'
import { ref, onBeforeMount } from 'vue'
import { RouterLink } from "vue-router"

const listOfCategories = ref(null);
const hasCategories = ref(false);

onBeforeMount(() => {
  const displayCategories = (categories) => {
    listOfCategories.value = categories;
    hasCategories.value = categories.length > 0;
  }

  new FetchRequest("GET", "api/categories").send(displayCategories, displayCategories);
});
</script>

<template>
  <!-- Live Auction (categories) -->
  <section id="categories" class="live-auction-section" v-show="hasCategories">
      <div class="text-center mb-4">
        <h5>Categories</h5>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-4 mb-3" v-for="category in listOfCategories" :key="category.id">
            <div class="position-relative">
              <div>
                <img src="/imgs/bidwars-logo.png" alt="category image" class="img-fluid w-100">
              </div>
              <div class="position-absolute top-50 start-50 translate-middle p-0 live-auction-category-item-name">
                <RouterLink :to="`/live-auction/category/${category.name}`" class="text-white fw-bolder live-auction-text text-decoration-none text-capitalize">{{ category.name }}</RouterLink>
              </div>
              <RouterLink :to="`/live-auction/category/${category.name}`" class="position-absolute bottom-0 top-0 end-0 start-0 bg-dark opacity-75 rounded"></RouterLink>
            </div>
          </div>
        </div>
      </div>
  </section>

</template>./Card.vue