<script setup>
import { RouterLink } from 'vue-router';
import NotificationItem from "../components/Profile/Notifications/Item.vue";
</script>

<template>

    <main id="main-section">
        <!-- page header -->
        <div class="container-fluid">
            <nav aria-label="breadcrumb" class="bg-light rounded">
                <ol class="breadcrumb p-1">
                    <li class="breadcrumb-item fw-bold p-1" aria-current="page">
                        <RouterLink to="/profile">Profile</RouterLink>
                    </li>
                    <li class="breadcrumb-item active text-dark fw-bold p-1">Notifications</li>
                </ol>
            </nav>
        </div>

        <section>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 text-secondary">
                        <small v-if="notifications.length > 0">You have <b class="text-danger">{{ unreadNotifications }}</b> unread notification</small>
                        <small v-else>You don't have any notification to see, yet.</small>
                    </div>

                    <div class="col-12 col-md-12 col-lg-6 mt-3" v-for="notification in notifications" :key="notification.id">
                        <NotificationItem :notification="notification"></NotificationItem>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>

<script>
    export default {
        data() {
            return {
                userId: this.$store.state.auth.id,
                notifications: [],
            }
        },
        methods: {
            goToHomePage(){
                if(!this.$store.getters.isLoggedIn){
                    this.$router.push("/");
                }
            },
            readNotifications(){
                const displayNotifications = (data) => {
                    this.notifications = data;
                }

                (new FetchRequest("GET", `api/notifications/${this.userId}`)).send(displayNotifications, displayNotifications);
            }
        },
        computed: {
            unreadNotifications(){
                let numberOfUnread = 0;

                this.notifications.forEach(el => {
                    if(el.un_read){
                        numberOfUnread++;
                    }
                });

                return numberOfUnread;
            }
        },
        mounted(){
            this.readNotifications();
            this.goToHomePage();
        }
    };
</script>