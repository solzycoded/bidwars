<script setup>
import PlaceBidModal from '../components/Item/PlaceBid.vue'
import { ref, onBeforeMount } from 'vue'
import { RouterLink, useRoute } from "vue-router"
import { App } from "../assets/js/util/app.js"

// const route = useRoute();

// const { name } = route.params;

// const listOfItems = ref(null);
// const hasItems = ref(false);

// onBeforeMount(() => {
//     const displayItems = (items) => {
//         listOfItems.value = items;
//         hasItems.value    = items.length > 0;
//     }

//     new FetchRequest("GET", `api/category/${name}`).send(displayItems, displayItems);
// });
</script>

<template>
    <main id="main-section">
        <!-- room details -->
        <section>
            <div class="card">
                <div class="card-header p-2 pb-0">
                    <div class="position-relative">
                        <div>
                            <h3>Room X</h3>
                            <p class="text-danger">1000 active bidders</p>
                        </div>
                        <div class="position-absolute end-0 top-0 bottom-0"><button type="button" class="btn btn-dark">Join Room</button></div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- room details -->
                    <div class="container-fluid ps-0 pe-0">
                        <div class="row mb-20">
                            <div class="col-12 col-md-4 text-left mb-2">
                                <h5 class="card-title">Categories</h5>
                                <div class="mt-2 card-text">
                                  <div class="d-inline text-secondary pe-2"><a class="text-decoration-none text-dark" href="#">Vintage Cars</a></div>
                                  <div class="d-inline text-secondary pe-2"><a class="text-decoration-none text-dark" href="#">Vintage Cars</a></div>
                                  <div class="d-inline text-secondary pe-2"><a class="text-decoration-none text-dark" href="#">Vintage Cars</a></div>
                                </div>
                            </div>

                            <div class="col-12 col-md-4 text-left mb-2">
                                <h5 class="card-title">Bids</h5>
                                <div class="mt-2 card-text">
                                    30 bids on 5 items
                                </div>
                            </div>

                            <div class="col-12 col-md-4 text-left mb-2">
                                <h5 class="card-title">Auction ends in</h5>
                                <div class="mt-2 card-text text-danger fw-bold">
                                    1:45:33
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row h-200">
                            <div class="col-12 col-md-3 mb-3">
                                <div class="card">
                                    <img src="/imgs/vintage-car.jpg" class="card-img-top" alt="auction item image">
                                    <div class="card-body">
                                        <h5 class="card-title limit-text fw-bolder p-0">1982 Cortina</h5>
                                        <p class="card-text mb-1"><a class="text-decoration-none text-dark" href="/categories/vintage-cars">Vintage cars</a></p>
                                        <p class="card-text fw-bold">$3000</p>
                                        <p class="card-text text-danger text-end">4 bids placed</p>
                                        <div class="d-inline"><a href="#" class="btn btn-outline-dark fw-bold">Preview</a></div>
                                        <div class="d-inline float-end"><a href="#" class="btn btn-dark fw-bold">Place Bid</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <PlaceBidModal></PlaceBidModal>
</template>