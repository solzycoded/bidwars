<script setup>
  import { ref, onBeforeMount } from 'vue'
  import ItemCard from "./Card.vue"

  const liveAuctionItems = ref(null);
  const hasLiveItems     = ref(false);

  onBeforeMount(() => {
    const listOfItems = (items) => {
      liveAuctionItems.value = items;
      hasLiveItems.value     = items.length > 0;
    }

    new FetchRequest("GET", "api/items/live/all").send(listOfItems, listOfItems);
  });

</script>

<template>
    <!-- Live Auction (items) -->
    <section id="live-auctions-items-section" v-show="hasLiveItems">
      <div class="text-center mb-4"> 
        <h5>Top Items</h5>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="item in liveAuctionItems" :key="item.id">
            <ItemCard :item="item"></ItemCard>
          </div>
        </div>
      </div>
    </section>
</template>