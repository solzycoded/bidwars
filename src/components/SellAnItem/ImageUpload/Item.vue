<script setup>
    const props = defineProps(['tag']);

    const id = "item-image-selector-" + props.tag;
</script>

<template>

    <div class="col-12 col-sm-12 col-md-4 mb-3">
        <div class="position-relative">
            <div>
                <img src="/imgs/bidwars-logo.png" alt="uploaded item image" class="img-fluid rounded item-image">
            </div>
            <div class="rounded-bottom position-absolute start-0 end-0 bottom-0 bg-dark opacity-75">
                <label class="btn bg-dark image-upload-label" :for="`${id}`">

                    <input class="item-image-selector" :id="`${id}`" name="image_selector" type="file" accept="image/jpeg, image/png, image/jpg" onchange="onImageSelected(this)">

                    <div class="text-white text-center fw-bold">
                        Choose From Library
                    </div>

                </label>
            </div>
        </div>
    </div>

</template>