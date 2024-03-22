<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
    
    <div class="d-flex align-items-center justify-content-center w-100-p">
        <div class="login-section">
            <form @submit.prevent="signup" autocomplete="off">

                <div class="text-center mb-20">
                    <h3>Signup</h3>
                </div>

                <div>
                    <div class="mb-3">
                        <label 
                            class="form-label text-capitalize fw-bold" 
                            for="email">
                            Email Address
                        </label>
                        <input class="form-control"
                            type="email"
                            name="email"
                            v-model="email"
                            id="email" required />
                    </div>

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
                    <div class="mb-3">
                        <label 
                            class="form-label text-capitalize fw-bold" 
                            for="username">
                            Re-Password
                        </label>
                        <input class="form-control"
                            type="password"
                            name="re_password"
                            v-model="rePassword"
                            id="re-password" required />
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" 
                        class="btn text-white rounded-pill fw-bold bg-danger fs-5 w-100-p">
                        Sign up
                    </button>

                    <p>Already have an account? <RouterLink to="/login" class="text-decoration-none text-danger">Login</RouterLink></p>
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
                email: '',
                password: '',
                rePassword: ''
            };
        },
        methods: {
            async signup() {
                this.$store.dispatch('login', { token: "sljfaljdfaf", username: "something", role: "user", id: "id" });
                // const data = {username: this.username, email: this.email, password: this.password};
                // new FetchRequest("POST", "api/users", data).send(this.signupSuccess, this.signupFailure);
            },
            signupSuccess(data){
                this.$store.dispatch('login', data);
                console.log(data);
            },
            signupFailure(data){
                console.log(data);
            }
        }
    };
</script>