<script setup>
    defineProps(['item', 'classContent']);
</script>

<template>
    <button :class="`${classContent}`" data-bs-toggle="modal" data-bs-target="#bid-offer" onclick="PlaceBid.itemDetails(this)" :item-id="`${item.id}`">Place Bid</button>
</template>