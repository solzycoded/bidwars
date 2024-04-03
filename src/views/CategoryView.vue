<script setup>
import PlaceBidModal from '../components/Item/PlaceBid.vue'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from "vue-router"
import ItemCard from "../components/Item/Card.vue"

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
        <section>
            <div class="container-fluid">
                <h5 class="text-capitalize">{{ name }} (Live Auction)</h5>

                <div class="row mt-3">
                    <div class="col-12 col-md-3 mb-3" v-for="item in listOfItems" :key="item.id">
                        <ItemCard :item="item"></ItemCard>
                    </div>
                    <div v-if="!hasItems" class="col-12">No items currently exist for {{ name }}.</div>
                </div>
            </div>
        </section>
    </main>

    <PlaceBidModal></PlaceBidModal>
</template>