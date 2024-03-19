<script setup>
import MyBid from './Card.vue';
import { ref, onBeforeMount } from 'vue';
import { RouterLink, useRoute } from "vue-router";

const items = ref(null);

onBeforeMount(() => {
    const displayItems = (listOfItems) => {
        items.value = listOfItems;
    }

    new FetchRequest("GET", `api/items/2/bids`).send(displayItems, displayItems);
});
</script>

<template>
    <!-- my bids -->
    <div class="col-12 col-md-12 col-lg-6 mb-6" id="my-bids">
        <h6>My Bids</h6>
        <hr>
        <div class="row">
            <div class="col-12 col-md-6 mb-3" v-for="item in items" :key="item.id">
                <MyBid :item="item"></MyBid>
            </div>
            
            <div class="col-12" v-show="(items == 0)">
                You've not yet placed a bid on any item.<br> 
                <div class="mt-2">Find an item you might like 
                <RouterLink class="btn btn-danger" to="/">Here</RouterLink></div>
            </div>
        </div>
    </div>
</template>