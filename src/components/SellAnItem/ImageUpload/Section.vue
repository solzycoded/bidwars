<script setup>
import ImageUploadItem from "./Item.vue";
</script>

<template>

    <section class="sell-your-item-section" id="image-upload">
        <div class="container-fluid p-0">
            <div class="text-start mb-4">
                <h5>Images of Item 
                    <!-- (<span class="fw-lighter">0</span>/3) -->
                </h5>
                <p class="m-0 text-secondary"><small>It’s important that your item has an appropraite visual representation. Kindly provide <b class="text-dark">1</b> of the most recent image(s) of your item.</small></p>
            </div>
            <div class="row">
                <ImageUploadItem :tag="`one`"></ImageUploadItem>
                <!-- <ImageUploadItem :tag="`two`"></ImageUploadItem>
                <ImageUploadItem :tag="`three`"></ImageUploadItem> -->
            </div>
        </div>
      </section>

</template>