<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { RouterLink, useRoute } from "vue-router";
    import BidItem from "./Item.vue";

    const props = defineProps(['item', 'userId']);

    const userBids = ref(null); // all of the bids under each item

    onBeforeMount(() => {
        const getUserBids = (bids) => {
            userBids.value = bids;
        }

        // get userBids
        new FetchRequest("GET", `api/items/${props.userId}/bids/${props.item.id}`).send(getUserBids, getUserBids);
    });
</script>

<template>
    <div class="card">
        <div class="card-header position-relative">
            <p class="fw-bold limit-text text-capitalize">{{ item.title }}</p>
            <div class="position-absolute end-0 top-0 bottom-0 p-2 pe-3">
                <RouterLink :to="`/live-auction/items/live/${item.title}`" role="button" class="btn btn-outline-dark p-1">Preview</RouterLink>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="bid in userBids" :key="bid.id">
                <BidItem :bid="bid"></BidItem>
            </li>
        </ul>
    </div>
</template>