<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { RouterLink, useRoute } from "vue-router"

    const props = defineProps(['item', 'liveItem']);

    const bidColor = props.liveItem ? "danger" : "secondary";

    const bids  = ref({bids : 0});

    onBeforeMount(() => {
        const getBids = (numberOfBids) => {
            bids.value = numberOfBids;
        }

        // get bids
        new FetchRequest("GET", `api/rooms/live/bids/${props.item.id}`).send(getBids, getBids);
    });
</script>

<template>
    <div class="card">
        <div class="position-relative">
            <img :src="`${item.image_text}`" class="card-img-top img-h-150 w-100" alt="auction item picture">
            <div class="position-absolute end-0 top-0 p-1">
                <button type="button" class="btn btn-danger fw-lighter p-1 fs-6">Delete</button>
            </div>
        </div>
        <div class="card-body p-2">
            <h6 class="card-title fw-bold p-0">{{ item.title }}</h6>
            <p class="card-text mb-1"><a class="text-decoration-none text-dark" href="/categories/vintage-cars">Vintage cars</a></p>
            <p class="card-text fw-bold">$3000</p>
            <p :class="`card-text text-${bidColor} text-start text-small`">{{ bids.bids }} bids placed</p>
            <div class="d-inline" v-show="liveItem">
                <RouterLink :to="`/live-auction/items/live/${item.title}`" class="btn btn-outline-dark fw-bold">Preview</RouterLink>
            </div>
        </div>
    </div>
</template>
