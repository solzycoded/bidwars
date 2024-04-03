<script setup>
    import { RouterLink } from "vue-router";
    import SearchResults from "./Search/Section.vue";

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <RouterLink active-class="active" class="navbar-brand fw-bolder" to="/"><img src="/imgs/bidwars-logo-sm.png" alt="bidwars logo" class="img-fluid" id="app-logo"></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink active-class="active" class="nav-link" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item" v-show="!isAdmin">
                        <RouterLink active-class="active" class="nav-link" to="/sell-an-item">Sell an Item</RouterLink>
                    </li>
                    <li class="nav-item" v-show="onHome">
                        <a class="nav-link" href="#categories">Categories</a>
                    </li>
                    <li class="nav-item" v-show="onHome">
                        <a class="nav-link" href="#rooms">Rooms</a>
                    </li>
                    <li class="nav-item" v-show="userHasLoggedIn && !isAdmin && !onDashboard">
                        <RouterLink active-class="active" class="nav-link" to="/profile" id="profile-link">Profile</RouterLink>
                    </li>
                    <li class="nav-item" v-show="userHasLoggedIn && isAdmin">
                        <RouterLink active-class="active" class="nav-link" to="/dashboard">Dashboard</RouterLink>
                    </li>

                    <li class="nav-item" v-show="userHasLoggedIn && isAdmin && !onDashboard">
                        <RouterLink class="nav-link" to="/dashboard#set-auction">Schedule Auction</RouterLink>
                    </li>
                    <li class="nav-item" v-show="userHasLoggedIn && isAdmin && onDashboard">
                        <a class="nav-link" href="#set-auction">Schedule Auction</a>
                    </li>
                    <li class="nav-item" v-show="userHasLoggedIn && isAdmin && !onDashboard">
                        <RouterLink class="nav-link" to="/dashboard#auction-list">Auction List</RouterLink>
                    </li>
                    <li class="nav-item" v-show="userHasLoggedIn && isAdmin && onDashboard">
                        <a class="nav-link" href="/dashboard#auction-list">Auction List</a>
                    </li>

                    <li class="nav-item" v-if="userHasLoggedIn && !isAdmin">
                        <RouterLink active-class="active" class="nav-link" to="/profile/notifications">Notifications</RouterLink>
                    </li>
                    <li class="nav-item" v-show="userHasLoggedIn">
                        <button class="nav-link btn bg-secondary text-white" @click="logout">Log out</button>
                    </li>
                    <li class="nav-item" v-show="!userHasLoggedIn">
                        <RouterLink active-class="active" class="nav-link" to="/login">Login</RouterLink>
                    </li>
                    <li class="nav-item" v-show="!userHasLoggedIn">
                        <RouterLink active-class="active" class="nav-link btn bg-danger text-white" to="/signup">Sign up</RouterLink>
                    </li>
                </ul>

                <div v-show="!onDashboard && !onProfile">
                    <SearchResults></SearchResults>
                </div>
            </div>
        </div>
    </nav>
</template>


<script>
    export default {
        methods: {
            logout(){
                this.$store.dispatch('logout');
                this.$router.push("/");
            }
        },
        computed: {
            userHasLoggedIn(){
                return this.$store.getters.isLoggedIn;
            },
            routeName(){
                return this.$route.name;
            },
            onDashboard(){
                return this.routeName=="dashboard";
            },
            onProfile(){
                return this.routeName=="profile";
            },
            onHome(){
                return this.routeName=="home";
            },
            isAdmin(){
                return this.$store.state.auth.role=="admin";
            }
        }
    };
</script>./Search/SearchResults.vue