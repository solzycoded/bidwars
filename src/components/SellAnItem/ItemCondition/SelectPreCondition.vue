<script setup>
import ConditionOption from "./ConditionOption.vue";
</script>

<template>
    
    <div class="mb-3">
        <div class="form-floating">
            <select class="form-select form-select-md" id="acquisition-condition" aria-label="select a condition">
                <option selected disabled>select a condition</option>
                <ConditionOption :condition="`pre`"></ConditionOption>
            </select>
            <label for="acquisition-condition">In what condition was the item, when you bought it?</label>
        </div>
    </div>

</template>