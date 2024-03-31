<script setup>
import MyItem from './Card.vue';
import { ref, onBeforeMount } from 'vue';
import { RouterLink, useRoute } from "vue-router";
// import { App } from "../assets/js/util/app.js";

defineProps(['userId']);
</script>

<template>
    <!-- my items -->
    <div class="col-12 col-md-6 mb-6" id="my-items">
        <h6 class="p-0">My Items</h6>
        <hr>
        <div class="row">
            <div class="col-12 col-sm-6 col-lg-4 mb-3 my-item" v-for="item in liveItems" :key="item.id" :my-item="`my-item-${item.id}`">
                <MyItem :item="item" :liveItem="true" :userId="userId"></MyItem>
            </div>

            <div class="col-12 col-sm-6 col-md-4 mb-3" v-for="item in otherItems" :key="item.id" :my-item="`my-item-${item.id}`">
                <MyItem :item="item" :liveItem="false" :userId="userId"></MyItem>
            </div>

            <div class="col-12" v-show="(liveItems == 0 && otherItems == 0)">
                You've not put up any item for auction, yet.<br>
                <RouterLink class="btn btn-danger mt-2" :to="`/sell-an-item`">Sell an Item</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                liveItems: [],
                otherItems: []
            }
        },
        methods: {
            getLiveItems(){
                const displayLiveItems = (items) => {
                    this.liveItems = items;
                }

                new FetchRequest("GET", `api/items/${this.userId}/live`).send(displayLiveItems, displayLiveItems);
           },
            getOtherItems(){
                const displayOtherItems = (items) => {
                    this.otherItems = items;
                }

                new FetchRequest("GET", `api/items/${this.userId}/others`).send(displayOtherItems, displayOtherItems);
           },
        },
        mounted(){
            this.getLiveItems();
            this.getOtherItems();
        }
    };
</script>