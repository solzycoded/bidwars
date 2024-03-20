<script setup>
import Category from "../components/SellAnItem/Category/Section.vue";
import ItemName from "../components/SellAnItem/ItemName/Section.vue";
import ImageUpload from "../components/SellAnItem/ImageUpload/Section.vue";
import ItemCondition from "../components/SellAnItem/ItemCondition/Section.vue";
import ItemPrice from "../components/SellAnItem/ItemPrice/Section.vue";
import ItemSalePeriod from "../components/SellAnItem/ItemSalePeriod/Section.vue";

import { ref, onBeforeMount, onMounted } from 'vue';
import { RouterLink, useRoute } from "vue-router";
</script>

<template>
    <main id="main-section">
        <div class="mb-3">
            <h4 class="link-offset-3">Sell your Item (<span id="sell-an-item-position" class="sell-an-item-position fw-lighter">1</span>/6)</h4>
        </div>

        <Category></Category>
        <ItemName></ItemName>
        <ImageUpload></ImageUpload>
        <ItemCondition></ItemCondition>
        <ItemPrice></ItemPrice>
        <ItemSalePeriod></ItemSalePeriod>

        <div class="mt-4">
            <div class="d-inline">
                <button role="button" id="prev-section" class="btn btn-dark disabled fs-4" onclick="prevSection()">Prev</button>
            </div>
            <div class="d-inline float-end">
                <button role="button" id="next-section" class="btn btn-dark fs-4" onclick="nextSection()">Next</button>
            </div>
        </div>
    </main>
</template>