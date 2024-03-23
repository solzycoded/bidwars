<script setup>
  import Nav from '../components/Nav.vue'
  import Header from '../components/Home/Header.vue'
  import Carousel from '../components/Home/Carousel.vue'
  import Invitation from '../components/Home/Invitation.vue'
  import LiveAuctionItems from '../components/Home/LiveAuctions/Items/Section.vue'
  import LiveAuctionCategories from '../components/Home/LiveAuctions/Categories/Section.vue'
  import LiveAuctionRooms from '../components/Home/LiveAuctions/Rooms/Section.vue'
</script>

<template>
  <!-- <Header> -->
    <Carousel v-if="userIsLoggedIn"></Carousel>
    <Invitation v-else></Invitation>
  <!-- </Header> -->

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
            }
        }
    };
</script>