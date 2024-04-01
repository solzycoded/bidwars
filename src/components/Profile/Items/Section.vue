<script setup>
import MyItem from './Card.vue';
import { RouterLink } from "vue-router";
// import { App } from "../assets/js/util/app.js";

defineProps(['userId']);
</script>

<template>
    <!-- my items -->
    <div class="col-12 col-md-6 mb-6" id="my-items">
        <h6 class="p-0">My Items</h6>
        <hr>
        <div class="row">
            <div class="col-12 col-sm-6 col-lg-4 mb-3 my-item" v-for="item in items" :key="item.id" :my-item="`my-item-${item.id}`">
                <MyItem :item="item" :liveItem="true" :userId="userId"></MyItem>
            </div>

            <div class="col-12" v-show="(items == 0)">
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
                items: [],
                otherItems: []
            }
        },
        methods: {
            getItems(){
                const displayItems = (items) => {
                    this.items = items;
                }

                new FetchRequest("GET", `api/items/${this.userId}/all-items`).send(displayItems, displayItems);
           }
        },
        mounted(){
            this.getItems();
        }
    };
</script>