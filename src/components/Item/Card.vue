<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { RouterLink } from "vue-router"
    import { App } from "../../assets/js/util/app.js"
    import PlaceBidButton from "./PlaceBidButton.vue"

    const props = defineProps(['item']);

    const bids  = ref(0);

    onBeforeMount(() => {
        const getBids = (numberOfBids) => {
            bids.value = numberOfBids;
        }

        // get bids
        new FetchRequest("GET", `api/items/${props.item.id}/bids`).send(getBids, getBids);
    });
</script>

<template>
    <div class="card">
        <img :src="`${item.image_blob}`" class="card-img-top img-h-150 w-100" alt="auction item image">
        <div class="card-body">
            <h5 class="card-title limit-text fw-bolder p-0 text-capitalize">{{ item.title }}</h5>
            <p class="card-text mb-1">
                <RouterLink class="text-decoration-none text-dark text-capitalize" :to="`/live-auction/category/${item.category}`">{{ item.category }}</RouterLink>
            </p>
            <p class="card-text fw-bold">{{ App.appendCurrency(App.formatNumber(item.price)) }}</p>
            <p class="card-text text-danger text-end">{{ bids.bids }} bids placed</p>
            <div class="d-inline">
                <RouterLink :to="`/live-auction/items/live/${item.title}`" class="btn btn-outline-dark fw-bold">Preview</RouterLink>
            </div>
            <div class="d-inline float-end" v-if="!isAdmin">
                <PlaceBidButton :item="item" :classContent="`btn btn-dark fw-bold`"></PlaceBidButton>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        computed: {
            isAdmin(){
                return this.$store.state.auth.role=='admin';
            }
        }
    }
</script>