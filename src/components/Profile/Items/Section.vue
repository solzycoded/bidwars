<script setup>
import MyItem from './Card.vue';
import { ref, onBeforeMount } from 'vue';
import { RouterLink, useRoute } from "vue-router";
// import { App } from "../assets/js/util/app.js";

const liveItems = ref(null);
const otherItems = ref(null);

onBeforeMount(() => {
    const displayLiveItems = (items) => {
        liveItems.value = items;
    }

    const displayOtherItems = (items) => {
        otherItems.value = items;
    }

    new FetchRequest("GET", `api/items/2/live`).send(displayLiveItems, displayLiveItems);
    new FetchRequest("GET", `api/items/2/others`).send(displayOtherItems, displayOtherItems);
});
</script>

<template>
    <!-- my items -->
    <div class="col-12 col-md-6 mb-6" id="my-items">
        <h6 class="p-0">My Items</h6>
        <hr>
        <div class="row">
            <div class="col-12 col-sm-6 col-lg-4 mb-3" v-for="item in liveItems" :key="item.id">
                <MyItem :item="item" :liveItem="true"></MyItem>
            </div>

            <div class="col-12 col-sm-6 col-md-4 mb-3" v-for="item in otherItems" :key="item.id">
                <MyItem :item="item" :liveItem="false"></MyItem>
            </div>

            <div class="col-12" v-show="(liveItems == 0 && otherItems == 0)">
                You've not put up any item for auction, yet.<br>
                <RouterLink class="btn btn-danger mt-2" :to="`/sell-an-item`">Sell an Item</RouterLink>
            </div>
        </div>
    </div>
</template>