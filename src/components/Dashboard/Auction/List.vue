<script setup>
import TableRow from "./Item.vue";

defineProps(['items', 'token']);
</script>

<template>
    <div id="auction-list-container">
        <table class="table table-hover">
            <thead class="sticky-top">
                <tr>
                    <th class="fw-bold" scope="col">#</th>
                    <th class="fw-bold" scope="col">Item Title</th>
                    <th class="fw-bold" scope="col">Item Category</th>
                    <th class="fw-bold" scope="col">Auction Date</th>
                    <th class="fw-bold" scope="col">Start</th>
                    <th class="fw-bold" scope="col">End</th>
                    <th class="fw-bold" scope="col">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key="item.auction_room_id" class="auction-item-row" :auction-id="`auction-${item.auction_room_id}`">
                    <TableRow :item="item" :adminToken="token"></TableRow>
                </tr>
                <tr v-if="items.length==0"><td colspan="7" class="text-center fs-5 text-secondary">Nothing to see here. Try again.</td></tr>
            </tbody>
        </table>
    </div>

</template>