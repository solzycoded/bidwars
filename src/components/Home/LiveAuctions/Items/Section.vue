<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { RouterLink } from "vue-router"

  const liveAuctionItems = ref(null);
  const hasLiveItems     = ref(false);

  onBeforeMount(() => {
    const listOfItems = (items) => {
      liveAuctionItems.value = items;
      hasLiveItems.value     = items.length > 0;
    }

    new FetchRequest("GET", "api/items/live").send(listOfItems, listOfItems);
  });

</script>

<template>
    <!-- Live Auction (items) -->
    <section id="live-auctions-items-section" v-show="hasLiveItems">
      <div class="text-center mb-4"> 
        <h5>Items</h5>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="item in liveAuctionItems" :key="item.id">
            <div class="position-relative">
                <div>
                    <img :src="item.image" class="img-thumbnail w-100 h-100 live-auction-item-image" alt="live auction image">
                </div>
                <div class="">
                    <p class="fw-bold m-0 live-auction-item-name text-capitalize">{{ item.title }}</p>
                    <p class="text-danger m-0">{{ item.bid_number }} bids so far</p>
                </div>
                <RouterLink :to="`/live-auction/items/live/${item.title}`" class="position-absolute bottom-0 top-0 end-0 start-0"></RouterLink>
            </div>
        </div>
        </div>
      </div>
    </section>
</template>