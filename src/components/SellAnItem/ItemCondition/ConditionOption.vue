<script setup>
import { ref, onBeforeMount } from 'vue';

const props = defineProps(['condition']);

const itemConditions = ref([]);

onBeforeMount(() => {
    const displayItemConditions = (listOfItemConditions) => {
        itemConditions.value = listOfItemConditions;
    }

    new FetchRequest("GET", `api/item-conditions/${props.condition}`).send(displayItemConditions, displayItemConditions);
});
</script>

<template>
    <option v-for="condition in itemConditions" :key="condition.id" :value="condition.id">{{ condition.item_condition }}</option>
</template>