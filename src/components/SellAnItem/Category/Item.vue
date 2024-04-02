<script setup>
defineProps(['category']);
</script>

<template>
    <div class="position-relative">
        <div>
            <img src="/imgs/bidwars-logo.png" alt="category image" class="img-fluid w-100">
        </div>
        <div class="position-absolute top-0 start-0 bottom-0 end-0 bg-dark opacity-75 rounded"></div>
        <div class="position-absolute top-50 start-50 translate-middle">
            <p class="text-white fw-bold live-auction-text text-capitalize">{{ category.name }}</p>
        </div>
    </div>
</template>