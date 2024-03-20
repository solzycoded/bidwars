<script setup>
import ConditionOption from "./ConditionOption.vue";
</script>

<template>
    
    <div class="mb-3">
        <div class="form-floating">
            <select class="form-select form-select-md" id="acquisition-condition" aria-label="select a condition">
                <option selected disabled>select a condition (e.g. looks new)</option>
                <ConditionOption :condition="`post`"></ConditionOption>
            </select>
            <label for="acquisition-condition">In what condition would you say the item currently is?</label>
        </div>
    </div>

</template>