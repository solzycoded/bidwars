<script setup>
import CategoryItem from "./Item.vue";
import { ref, onBeforeMount } from 'vue';

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

                    <div class="col-12 col-sm-12 col-md-4 mb-3 sell-an-item-category-item" v-for="category in categories" :key="category.id" onclick="onCategorySelected(this)">
                        <CategoryItem :category="category"></CategoryItem>
                        <input type="hidden" name="category_id" class="category_id" :value="`${category.id}`">
                    </div>

                </div>
          </div>
      </section>

</template>