<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
    
    <div class="d-flex align-items-center justify-content-center w-100-p">
        <div class="login-section">
            <form @submit.prevent="" autocomplete="off">

                <div class="text-center mb-20">
                    <h3>Login</h3>
                </div>

                <div>
                    <div class="mb-3">
                        <label 
                            class="form-label text-capitalize fw-bold" 
                            for="username">
                            Username
                        </label>
                        <input class="form-control"
                            type="text"
                            name="username"
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