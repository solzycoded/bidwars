<script setup>
    import { App } from "../../../assets/js/util/app.js";

    const props = defineProps(['bid']);
    const offer = App.appendCurrency(App.formatNumber(props.bid.offer));
    const app = new App(new Date(props.bid.created_at));

    const date = app.getDate();
    const time = app.convertFrom24To12Format();
</script>

<template>
    <div>You offered <span class="fw-bolder text-danger">{{ offer }}</span> at <small>{{ time }} on {{ date }}</small></div>
</template>