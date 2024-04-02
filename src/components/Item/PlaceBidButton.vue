<script setup>
    import { RouterLink } from "vue-router";

    defineProps(['item', 'classContent']);
</script>

<template> 
    <button v-if="isLoggedIn" :class="`${classContent} bg-danger border-danger`" data-bs-toggle="modal" data-bs-target="#bid-offer" onclick="PlaceBid.itemDetails(this)" :item-id="`${item.id}`">Place Bid</button>
    <RouterLink v-else class="btn btn-secondary fw-bold" to="/login">Place Bid</RouterLink>
</template>

<script>
    export default {
        computed: {
            isLoggedIn(){
                return this.$store.getters.isLoggedIn;
            },
            placeBidDisplay(){
                return this.isLoggedIn ? "Place Bid" : "Login to Place Bid";
            }
        }
    }
</script>