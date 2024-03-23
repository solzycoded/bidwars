<script setup>
import { RouterLink } from "vue-router"
</script>

<template>

    <div class="d-flex align-items-center justify-content-center w-100-p">
        <div class="login-section">
            <form @submit.prevent="login" autocomplete="off">

                <div class="text-center mb-20">
                    <h3>Login</h3>
                </div>

                <div>
                    <div class="text-danger mb-2 text-center" v-show="error!==''">{{ error }}</div>
                    <div class="mb-3">
                        <label 
                            class="form-label text-capitalize fw-bold" 
                            for="username">
                            Username
                        </label>
                        <input class="form-control"
                            type="text"
                            name="username"
                            v-model="username"
                            id="username" required />
                    </div>

                    <div class="mb-3">
                        <label 
                            class="form-label text-capitalize fw-bold" 
                            for="username">
                            Password
                        </label>
                        <input class="form-control"
                            type="password"
                            name="password"
                            v-model="password"
                            id="password" required />
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" 
                        class="btn text-white rounded-pill fw-bold bg-danger fs-5 w-100-p">
                        Login
                    </button>

                    <p>Don't have an account yet? <RouterLink to="/signup" class="text-decoration-none text-danger">Signup</RouterLink></p>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                error: ''
            };
        },
        methods: {
            async login() {
                const data = {username: this.username, password: this.password};
                new FetchRequest("POST", "api/users/login", data).send(this.loginSuccess, this.loginFailure);
            },
            loginSuccess(data){
                this.$store.dispatch('login', data);

                // store generated token
                new FetchRequest("POST", "api/users/create-token", { id: data.id, token: data.token }).send();

                this.goToProfilePage();

                this.error = '';
            },
            loginFailure(data){
                this.error = data.message;
            },
            goToProfilePage(){
                if(this.$store.getters.isLoggedIn){
                    if(this.$store.state.role=="user"){
                        this.$router.push("profile");
                    }
                    else if(this.$store.state.role=="admin"){
                        alert("now on the admin page");
                    }
                }
            }
        },
        mounted(){
            this.goToProfilePage();
        }
    };
</script>