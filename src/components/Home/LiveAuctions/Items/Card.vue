<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { RouterLink } from "vue-router"

    const props = defineProps(['item']);

    const bidTotal = ref(0);

    onBeforeMount(() => {
        const getNumberOfBids = (bids) => {
            bidTotal.value = bids;
        }

        new FetchRequest("GET", `api/items/${props.item.id}/bids`).send(getNumberOfBids, getNumberOfBids);
    });
</script>

<template>
    <div class="position-relative">
        <div>
            <img :src="`/imgs/items/${item.image}`" class="img-thumbnail w-100 h-100 live-auction-item-image" alt="live auction image">
        </div>
        <div class="">
            <p class="fw-bold m-0 live-auction-item-name text-capitalize">{{ item.title }}</p>
            <p class="text-danger m-0">{{ bidTotal.bids }} bids so far</p>
        </div>
        <RouterLink :to="`/live-auction/items/live/${item.title}`" class="position-absolute bottom-0 top-0 end-0 start-0"></RouterLink>
    </div>
</template>