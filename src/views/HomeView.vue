<script setup>
  import Invitation from '../components/Home/Invitation.vue'
  import LiveAuctionItems from '../components/Home/LiveAuctions/Items/Section.vue'
  import LiveAuctionCategories from '../components/Home/LiveAuctions/Categories/Section.vue'
  import LiveAuctionRooms from '../components/Home/LiveAuctions/Rooms/Section.vue'
</script>

<template>

  <Invitation v-if="!userIsAdmin"></Invitation>

  <main id="main-section">

    <div class="text-center">
      <h4 class="text-decoration-underline">Live Auctions</h4>
    </div>

    <LiveAuctionItems></LiveAuctionItems>
    <LiveAuctionCategories></LiveAuctionCategories>
    <LiveAuctionRooms></LiveAuctionRooms>

  </main>

</template>

<script>
    export default {
        computed: {
            userIsLoggedIn(){
              return this.$store.getters.isLoggedIn;
            },
            userIsAdmin(){
              return this.$store.state.auth.role=='admin';
            }
        }
    };
</script>