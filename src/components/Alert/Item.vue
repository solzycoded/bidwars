<script setup>
let props = defineProps(['success', 'show', 'message']);

let bgColor = props.success ? 'success' : 'danger';
</script>

<template>
    <div v-if="showAlert">
        <div class="d-flex fixed-bottom justify-content-evenly alert-container">

            <button :class="`alert-btn alert-message-container bg-${bgColor}`">
                <span class="alert-message-content">{{ message }}</span>
            </button>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAlert: false
            }
        },
        watch: {
            show(newVal, oldVal){
                this.startTimeOut(newVal);
            }
        },
        computed: {
            mustShowAlert(){
                this.showAlert = this.show;

                this.startTimeOut();

                return this.showAlert;
            }
        },
        methods: {
            startTimeOut(newVal) {
                setTimeout(() => {
                    this.showAlert = false;
                }, 5000);
            },
            setShowAlert(){
                this.showAlert = this.show;
            }
        },
        mounted() {
            this.setShowAlert();
        },
    }
</script>