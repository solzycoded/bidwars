<script setup>
import PlaceBidModal from '../components/Item/PlaceBid.vue'
import { ref, onBeforeMount } from 'vue'
import { RouterLink, useRoute } from "vue-router"
import { App } from "../assets/js/util/app.js"

const route = useRoute();

const { name } = route.params;

const listOfItems = ref(null);
const hasItems = ref(false);

onBeforeMount(() => {
    const displayItems = (items) => {
        listOfItems.value = items;
        hasItems.value    = items.length > 0;
    }

    new FetchRequest("GET", `api/category/${name}`).send(displayItems, displayItems);
});
</script>

<template>
    <main id="main-section">
        
    </main>

    <PlaceBidModal></PlaceBidModal>
</template>