<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { RouterLink } from "vue-router";
    import { App } from "../../../assets/js/util/app.js";

    const props = defineProps(['item', 'liveItem', 'userId']);

    const bidColor = props.liveItem ? "danger" : "secondary";

    const bids  = ref({bids : 0});

    onBeforeMount(() => {
        const getBids = (numberOfBids) => {
            bids.value = numberOfBids;
        }

        // get bids
        new FetchRequest("GET", `api/rooms/live/bids/${props.item.id}`).send(getBids, getBids);
    });
</script>

<template>
    <div class="card">
        <div class="position-relative">
            <img :src="`${item.image_blob}`" class="card-img-top img-h-150 w-100" alt="auction item picture">
            <div class="position-absolute end-0 top-0 p-1">
                <form @submit.prevent="deleteItem">
                    <button type="submit" class="btn btn-danger fw-lighter p-1 fs-6">Delete</button>
                </form>
            </div>
        </div>
        <div class="card-body p-2">
            <h6 class="card-title fw-bold p-0">{{ item.title }}</h6>
            <p class="card-text mb-1"><a class="text-decoration-none text-dark" href="/categories/vintage-cars">Vintage cars</a></p>
            <p class="card-text fw-bold">$3000</p>
            <p :class="`card-text text-${bidColor} text-start text-small`">{{ bids.bids }} bids placed</p>
            <div class="d-inline" v-show="liveItem">
                <RouterLink :to="`/items/${item.title}`" class="btn btn-outline-dark fw-bold">Preview</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: this.$store.state.auth.token
            }
        },
        methods: {
            deleteItem(){
                const confirmAction = confirm("Your item will now be deleted.");

                if(confirmAction){
                    let data = {user_id: this.userId, token: this.token};

                    new FetchRequest("DELETE", `api/items/${this.item.id}`, data).send(this.successResponse, this.failureResponse);
                }
            },
            successResponse(data){
                let itemContainer = document.querySelector(`.my-item[my-item='my-item-${this.item.id}']`);

                if(itemContainer!=null){
                    itemContainer.classList.add('d-none');

                    // show alert
                    App.alert(true, data.message);
                }
            },
            failureResponse(data){
                App.alert(false, data.message);
            }
        },
    }
</script>