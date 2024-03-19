<script setup>
import MyItems from '../components/Profile/Items/Section.vue'
import MyBids from '../components/Profile/Bids/Section.vue'
import { RouterLink, useRoute } from "vue-router"
</script>

<template>
    <main id="main-section">
        <!-- page header -->
        <div class="container-fluid">
            <nav aria-label="breadcrumb" class="bg-light rounded">
                <ol class="breadcrumb p-1">
                    <!-- <li class="breadcrumb-item fw-bolder"><a href="#">Home</a></li> -->
                    <li class="breadcrumb-item active text-dark fw-bold p-1" aria-current="page">Profile</li>
                </ol>
            </nav>
        </div>

        <!-- body -->
        <section>
            <div class="container-fluid">
                <div class="row">
                    <MyItems></MyItems>
                    <MyBids></MyBids>
                </div>
            </div>
        </section>
    </main>
</template>