<script setup>
import PlaceBidModal from '../components/Item/PlaceBid.vue'
import Bids from '../components/Item/Bids.vue'
import { ref, onBeforeMount } from 'vue'
import { RouterLink, useRoute } from "vue-router"
import { App } from "../assets/js/util/app.js"
import PlaceBidButton from "../components/Item/PlaceBidButton.vue"

const route    = useRoute();

const { name } = route.params;

const item       = ref(null);
const ownerId    = ref(null);
const itemImages = ref(null);
const bidTotal   = ref(null);

const countDown  = ref("00:00:00");

onBeforeMount(() => {
    const getNumberOfBids = (bids) => {
        bidTotal.value = bids;
    }

    const getItemImages = (images) => {
        itemImages.value = images;

        new FetchRequest("GET", `api/items/${item.value.id}/bids`).send(getNumberOfBids, getNumberOfBids);
    }

    const displayItem = (itemDetails) => {
        item.value = itemDetails;

        if(itemDetails!=null){
            ownerId.value = itemDetails.owner;

            App.startCountDown(countDown, itemDetails.auction_end);

            new FetchRequest("GET", `api/item/image/${item.value.id}`).send(getItemImages, getItemImages);
        }
    }

    new FetchRequest("GET", `api/items/${name}`).send(displayItem, displayItem);
});
</script>

<template>

    <main id="main-section">
        <!-- item details -->
        <section class="shadow bg-body rounded" v-if="item!=null">
            <div class="fs-5 container-fluid">
                <div class="row">

                    <div class="col-12 col-md-4 col-lg-5">
                        <div v-for="image in itemImages" :key="image.id"><img :src="`/imgs/items/${image.image_blob}`" class="img-fluid w-100 item-details-img h-100" alt="item picture"></div>
                    </div>
                    <!-- item details -->
                    <div class="col-12 col-md-8 col-lg-4">
                        <div class="p-2">
                            <h5 class="fw-bolder fs-4 item-name text-capitalize">{{ item.title }}</h5>
                            <p class=""><RouterLink :to="`/live-auction/category/${item.category}`" class="link-offset-3 text-capitalize">{{ item.category }}</RouterLink></p>
                            <p>Item was acquired <small class="fw-lighter">{{ item.purchase_duration + " " + item.time_frame + "(s)"}} ago</small></p>
                            <div>
                                <p class="fw-bold m-0">Condition of Item</p>
                                <p class="fs-6 text-uppercase">{{ item.item_condition }}</p>
                            </div>

                            <div>
                                <p class="fw-bold m-0">Sellers Price</p>
                                <p class="fs-6 item-price">{{ App.appendCurrency(App.formatNumber(item.price)) }}</p>
                            </div>

                            <div class="mt-4 fs-6" v-if="countDown!='EXPIRED'">
                                <p class="m-0">Item is currently live in <RouterLink :to="`/live-auction/rooms/live/${item.room}`" class="link-offset-2">Room <span>{{ item.room }}</span></RouterLink></p>
                                <p>Auction ends in <small class="text-danger bid-countdown">{{ countDown }}</small></p>
                            </div>
                            <div class="mt-4 fs-6" v-else>
                                <p class="m-0">Item in <b>Room {{ item.room }}</b></p>
                            </div>

                            <div>
                                <div class="d-inline me-2" v-if="!isAdmin && countDown!='EXPIRED'">
                                    <PlaceBidButton :item="item" :classContent="`btn btn-dark fs-4 place-bid`"></PlaceBidButton>
                                </div>
                                <div class="d-inline">
                                    <small class="text-secondary fw-bold fs-6 p-0">{{ (bidTotal==undefined ? 0 : bidTotal.bids) }} bid(s) placed on item.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- bidding details -->
                    
                    <div class="col-12 col-md-12 col-lg-3" v-if="(item!=null && (loggedInUserId==item.owner || isAdmin))">
                        <div class="bidding-info p-2">
                            <Bids :itemId="item.id"></Bids>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="fs-4" v-else>The selected Item does not exist or isn't Live. Please make a different selection.</div>

    </main>

    <PlaceBidModal v-if="!isAdmin"></PlaceBidModal>
</template>

<script>
    export default {
        data() {
            return {
                loggedInUserId: this.$store.state.auth.id
            }
        },
        computed: {
            isAdmin(){
                return this.$store.state.auth.role=='admin';
            }
        }
    }
</script>