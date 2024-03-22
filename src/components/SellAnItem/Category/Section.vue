<script setup>
import { def } from "@vue/shared";
import CategoryItem from "./Item.vue";
import { ref, onBeforeMount, onMounted } from 'vue';
import { RouterLink, useRoute } from "vue-router";
// import { App } from "../assets/js/util/app.js";

const categories = ref(null);

onBeforeMount(() => {
    const displayCategories = (listOfCategories) => {
        categories.value = listOfCategories;
    }

    new FetchRequest("GET", "api/categories").send(displayCategories, displayCategories);
});

</script>

<script>
export default {
    // data() {
    //     return {
    //         something: "afda",
    //     }
    // },
    // methods: {
    //     createAnItem(){
    //         console.log("something");
    //     }
    // },
}
</script>
<template>

    <section class="sell-your-item-section active-section" id="select-category">
          <div class="container-fluid p-0">
                <div class="text-start mb-4">
                    <h5>Category</h5>
                    <p class="m-0 text-secondary"><small>select a category that your item would belong to</small></p>
                </div>
                <div class="row">

                    <input type="hidden" name="category" id="selected-category">
                    <div class="col-12 col-sm-12 col-md-4 mb-3 sell-an-item-category-item" v-for="category in categories" :key="category.id" onclick="onCategorySelected(this, 'something')">
                        <CategoryItem :category="category"></CategoryItem>
                    </div>

                </div>
          </div>
      </section>

</template>