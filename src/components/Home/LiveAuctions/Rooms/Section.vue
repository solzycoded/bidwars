<script setup>
  import Room from "./Item.vue";
  import { ref, onBeforeMount } from 'vue';

  const liveAuctionRooms = ref(null);
  const hasLiveRooms     = ref(false);

  onBeforeMount(() => {
    const getRooms = (rooms) => {
      liveAuctionRooms.value = rooms;
      hasLiveRooms.value     = rooms.length > 0;
    }

    new FetchRequest("GET", "api/rooms/live").send(getRooms, getRooms);
  });
</script>

<template>
    <!-- Live Auction (rooms) -->
    <section class="live-auction-section" v-show="hasLiveRooms">

        <div class="text-center mb-4">
          <h5>Rooms</h5>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-4 col-lg-6 mb-2" v-for="room in liveAuctionRooms" :key="room.id">
              <Room :room="room"></Room>
            </div>
          </div>
        </div>

    </section>
</template>