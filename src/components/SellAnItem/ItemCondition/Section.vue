<script setup>
import SelectTime  from './SelectTime.vue';
import SelectPreCondition from './SelectPreCondition.vue';
import SelectPostCondition from './SelectPostCondition.vue';
</script>

<template>

    <section class="sell-your-item-section" id="item-condition">
        <div class="container-fluid p-0">
            <div class="text-start mb-4">
                <h5>Condition of Item</h5>
            </div>

            <SelectTime></SelectTime>
            <SelectPreCondition></SelectPreCondition>
            <SelectPostCondition></SelectPostCondition>

        </div>
    </section>

</template>