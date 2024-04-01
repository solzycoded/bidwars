<script setup>
import PlaceBidModal from '../components/Item/PlaceBid.vue'
import { ref, onBeforeMount } from 'vue'
import { RouterLink, useRoute } from "vue-router"
import { App } from "../assets/js/util/app.js"
import PlaceBidButton from "../components/Item/PlaceBidButton.vue"
import ItemCard from "../components/Item/Card.vue";

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
                        <!-- <div class="card">
                            <img :src="item.image" class="card-img-top h-100 img-200" alt="auction item image">
                            <div class="card-body">
                                <h5 class="card-title limit-text fw-bolder p-0 text-capitalize">{{ item.title }}</h5>
                                <p class="card-text fw-bold">{{ App.appendCurrency(App.formatNumber(item.price)) }}</p>
                                <p class="card-text text-danger text-end">{{ item.bid_number }} bids placed</p>
                                <div 
                                class="d-inline">
                                    <RouterLink :to="`/live-auction/items/live/${item.title}`" class="btn btn-outline-dark fw-bold">Preview</RouterLink>
                                </div>
                                <div class="d-inline float-end">
                                    <PlaceBidButton :item="item" :classContent="`btn btn-dark fw-bold`"></PlaceBidButton>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div v-if="!hasItems" class="col-12">No items currently exist for {{ name }}.</div>
                </div>
            </div>
        </section>
    </main>

    <PlaceBidModal></PlaceBidModal>
</template>