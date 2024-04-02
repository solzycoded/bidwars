<script setup>
    import { App } from "../../../assets/js/util/app.js";

    const props = defineProps(['bid']);
    const offer = App.appendCurrency(App.formatNumber(props.bid.offer));
    // const bidColor = props.liveItem ? "danger" : "secondary";
    const app = new App(new Date(props.bid.created_at));

    const date = app.getDate();
    const time = app.convertFrom24To12Format();
</script>

<template>
    <div>You offered <span class="fw-bolder text-danger">{{ offer }}</span> at <small>{{ time }} on {{ date }}</small></div>
    <!-- <div class="mt-2 float-end"><button role="button" class="btn btn-danger p-1">Withdraw</button></div> -->
</template>