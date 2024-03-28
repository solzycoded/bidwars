<script setup>
import { ref, onBeforeMount } from 'vue';

const timeFrames = ref([]);

onBeforeMount(() => {
    const displayTimeFrames = (listOfTimeFrames) => {
        timeFrames.value = listOfTimeFrames;
    }

    new FetchRequest("GET", "api/time-frames").send(displayTimeFrames, displayTimeFrames);
});
</script>

<template>
    <div class="mb-3">
        <div>
            <label for="acquisition-period" class="mb-2">Kindly tell the potential bidders, how long ago you acquired this item</label>
            <div class="input-group">
                <input class="form-control p-0 ps-2" id="purchase-duration" type="number" name="purchase_duration" placeholder="e.g. 5">
                <select class="form-select form-select-md" aria-label="Select a time" id="acquisition-period">
                    <option v-for="timeFrame in timeFrames" :key="timeFrame.id" :value="timeFrame.id">{{ timeFrame.name }}(s)</option>
                </select>
                <p class="ms-2">ago</p>
            </div>
        </div>
    </div>
</template>