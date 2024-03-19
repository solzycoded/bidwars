<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { RouterLink } from "vue-router";
 
    const props = defineProps(['room']);

    const pictures   = ref([]);
    const bids       = ref({ bids : 0 });
    const categories = ref([]);
    const items      = ref([]);

    onBeforeMount(() => {
        const getRoomImages = (images) => {
            pictures.value = images;
        }

        const getBids = (numberOfBids) => {
            bids.value = numberOfBids;
        }

        const getCategories = (listOfCategories) => {
            categories.value = listOfCategories;
        }

        const getItems = (listOfItems) => {
            items.value = listOfItems;
        }

        new FetchRequest("GET", `api/rooms/live/images/${props.room.id}`).send(getRoomImages, getRoomImages);
        new FetchRequest("GET", `api/rooms/live/bids/${props.room.id}`).send(getBids, getBids);
        new FetchRequest("GET", `api/rooms/live/categories/${props.room.id}-3`).send(getCategories, getCategories);
        new FetchRequest("GET", `api/rooms/live/items/${props.room.id}-5`).send(getItems, getItems);
    });
</script>

<template>
    <div class="shadow mb-2 bg-body rounded">
        <!-- container-fluid p-0 -->
        <div class="d-flex justify-content-start">
            <!-- <div class="row bg-secondary"> class="col-4 col-sm-4" -->
                <div v-for="picture in pictures" :key="picture.id" class="w-100-p">
                    <img :src="`${picture.image_text}`" class="img-fluid w-100 img-h-120 w-inherit" alt="auction room image">
                </div>
            <!-- </div> -->
        </div>

        <div class="p-3">
            <div>
                <div class="d-inline fw-bold text-capitalize">Room {{ room.room }}</div>
                <div class="d-inline text-danger float-end">{{ bids.bids }} bid(s) so far</div>
            </div>
            <div class="mt-2">
                <div class="d-inline text-secondary pe-2" v-for="category in categories" :key="category.id">
                    <RouterLink class="link-offset-3 text-capitalize" :to="`live-auction/category/${category.name}`">{{ category.name }}</RouterLink>
                </div>
            </div>

            <div class="mt-2">
                <p class="d-inline text-secondary pe-2 text-capitalize" v-for="item in items" :key="item.id">{{ item.title }}</p>
            </div>

            <div class="mt-4">
                <div class="d-inline">
                    <RouterLink class="btn btn-outline-dark fw-bold" :to="`/live-auction/rooms/live/${room.room}`">Preview</RouterLink>
                </div>
                <div class="d-inline float-end">
                    <button class="btn btn-dark fw-bold">Join Room</button>
                </div>
            </div>
        </div>
    </div>
</template>