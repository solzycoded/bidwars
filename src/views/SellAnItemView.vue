<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { RouterLink, useRoute } from "vue-router"
import { App } from "../assets/js/util/app.js"

// const route    = useRoute();

// const { name } = route.params;

// const item       = ref(null);
// const itemImages = ref(null);
// const bidTotal   = ref(null);

// const countDown  = ref("00:00:00");

// onBeforeMount(() => {
//     const getNumberOfBids = (bids) => {
//         bidTotal.value = bids;
//     }

//     const getItemImages = (images) => {
//         itemImages.value = images;

//         new FetchRequest("GET", `api/items/${item.value.id}/bids`).send(getNumberOfBids, getNumberOfBids);
//     }

//     const displayItem = (itemDetails) => {
//         item.value = itemDetails;

//         App.startCountDown(countDown, itemDetails.auction_end);

//         new FetchRequest("GET", `api/item/image/${item.value.id}`).send(getItemImages, getItemImages);
//     }

//     new FetchRequest("GET", `api/items/${name}`).send(displayItem, displayItem);
// });
</script>

<template>
    <main id="main-section">
        
    </main>
</template>