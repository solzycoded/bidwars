<script setup>
import MyBid from './Card.vue';
import { RouterLink } from "vue-router";

defineProps(['userId']);
</script>

<template>
    <!-- my bids -->
    <div class="col-12 col-md-12 col-lg-6 mb-6" id="my-bids">
        <h6>My Bids</h6>
        <hr>
        <div class="row">
            <div class="col-12 col-md-6 mb-3" v-for="item in items" :key="item.id">
                <MyBid :item="item" :userId="userId"></MyBid>
            </div>
            
            <div class="col-12" v-show="(items == 0)">
                You've not yet placed a bid on any item.<br> 
                <div class="mt-2">Find an item you might like 
                <RouterLink class="btn btn-danger" to="/">Here</RouterLink></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: []
            }
        },
        methods: {
            mybids(){
                const displayItems = (listOfItems) => {
                    this.items = listOfItems;
                }

                new FetchRequest("GET", `api/items/${this.userId}/bidder-items`).send(displayItems, displayItems);
            }
        },
        mounted() {
            this.mybids();
        },
    }
</script>