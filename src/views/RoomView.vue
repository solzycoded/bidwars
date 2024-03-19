<script setup>
    import PlaceBidModal from '../components/Item/PlaceBid.vue'
    import ItemCard from '../components/Item/Card.vue'
    import { ref, onBeforeMount } from 'vue'
    import { RouterLink, useRoute } from "vue-router"
    import { App } from "../assets/js/util/app.js"

    const route = useRoute();

    const { name } = route.params;

    const room       = ref(null);
    const bids       = ref({ bids : 0 });
    const countDown  = ref("00:00:00");
    const categories = ref([]);
    const items      = ref([]);

    onBeforeMount(() => {
        const getBids = (numberOfBids) => {
            bids.value = numberOfBids;
        }

        const getCategories = (listOfCategories) => {
            categories.value = listOfCategories;
        }

        const getItems = (listOfItems) => {
            items.value = listOfItems;
        }

        const getRoomDets = (roomDets) => {
            room.value = roomDets;

            let roomId = roomDets.id;

            // get bids
            new FetchRequest("GET", `api/rooms/live/bids/${roomId}`).send(getBids, getBids);

            // initiate countdown
            App.startCountDown(countDown, roomDets.auction_end);

            // get categories
            new FetchRequest("GET", `api/rooms/live/categories/${roomId}`).send(getCategories, getCategories);

            // get items
            new FetchRequest("GET", `api/rooms/live/items/${roomId}/all`).send(getItems, getItems);
        }

        new FetchRequest("GET", `api/rooms/live/${name}`).send(getRoomDets, getRoomDets);
    });
</script>

<template>
    <main id="main-section">
        <!-- room details -->
        <section>
            <div class="card">
                <div class="card-header p-2 pb-0">
                    <div class="position-relative">
                        <div>
                            <h3 class="text-capitalize">Room {{ name }}</h3>
                            <p class="text-danger">{{ (room==null ? 0 : room.bidders) }} active bidder(s)</p>
                        </div>
                        <div class="position-absolute end-0 top-0 bottom-0">
                            <button type="button" class="btn btn-dark">Join Room</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- room details -->
                    <div class="container-fluid ps-0 pe-0">
                        <div class="row mb-20">
                            <div class="col-12 col-md-4 text-left mb-2">
                                <h5 class="card-title">Categories</h5>
                                <div class="mt-2 card-text container-fluid p-0">
                                    <div class="d-inline text-secondary pe-3" v-for="category in categories" :key="category.id">
                                        <RouterLink class="link-offset-2 text-dark text-capitalize" :to="`/live-auction/category/${category.name}`">{{ category.name }}</RouterLink>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-md-4 text-left mb-2">
                                <h5 class="card-title">Bids</h5>
                                <div class="mt-2 card-text">
                                    {{ bids.bids }} bid(s) on {{ items.length }} items
                                </div>
                            </div>

                            <div class="col-12 col-md-4 text-left mb-2">
                                <h5 class="card-title">Auction ends in</h5>
                                <div class="mt-2 card-text text-danger fw-bold">
                                    {{ countDown }}
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row h-200">
                            <div class="col-12 col-md-3 mb-3" v-for="item in items" :key="item.id">
                                <ItemCard :item="item"></ItemCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <PlaceBidModal></PlaceBidModal>
</template>