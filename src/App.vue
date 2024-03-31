<script setup>
  import { RouterView } from "vue-router"
  import Nav from './components/Nav.vue'
  import Alert from './components/Alert/Item.vue'
</script>

<template>

  <main>
    <Nav></Nav>
    <RouterView />
    <Alert></Alert>
  </main>
</template>