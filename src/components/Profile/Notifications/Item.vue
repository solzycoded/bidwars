<script setup>
    import { App } from '@/assets/js/util/app';

    const props            = defineProps(['notification']);

    const app              = new App(new Date(props.notification.created_at));
    const notificationDate = `${app.getDate(true)} ${app.convertFrom24To12Format()}`;
    const unread = props.notification.un_read ? 'un-read' : 'read';
</script>

<template>
    <div :class="`border-bottom table-hover ${unread}`">
        <div class="mb-3">
            <p :class="`d-inline text-${(!props.notification.un_read ? 'secondary fw-semibold' : 'dark fw-bold')}`">{{ notificationDate }}</p>
        </div>
        <div>
            <p :class="`text-${(!props.notification.un_read ? 'secondary' : 'dark')} fw-normal`" v-html="notification.message"></p>
        </div>
    </div>
</template>