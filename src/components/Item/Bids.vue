<script setup>
import { App } from '@/assets/js/util/app';
defineProps(['itemId']);

</script>

<template>
    <h5 class="border-bottom pb-2">Bidders X <b class="text-danger">Bids</b></h5>
    <div class="bidding-info-container">
        <div v-for="bid in bids">
            <p class="fw-lighter fs-6">{{ bid.name }} made an offer of <b class="text-danger">{{ App.appendCurrency(App.formatNumber(bid.offer))}}</b> at <small class="text-bold">{{ formatTime(bid.created_at) }}</small></p>
        </div>
        <div v-if="bids.length==0"><p class="fw-bold fs-6">No bid for this item, yet.</p></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bids: []
            }
        },
        methods: {
            getBids(){
                const getListOfBids = (listOfBids) => {
                    this.bids = listOfBids;
                }

                new FetchRequest("GET", `api/items/${this.itemId}/bidders`).send(getListOfBids, getListOfBids);
            },
            formatTime(date){
                const app = new App(new Date(date));

                return app.convertFrom24To12Format();
            }
        },
        mounted() {
            this.getBids();
        },
    }
</script>