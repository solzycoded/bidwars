<script setup>
import Category from "../components/SellAnItem/Category/Section.vue";
import ItemName from "../components/SellAnItem/ItemName/Section.vue";
import ImageUpload from "../components/SellAnItem/ImageUpload/Section.vue";
import ItemCondition from "../components/SellAnItem/ItemCondition/Section.vue";
import ItemPrice from "../components/SellAnItem/ItemPrice/Section.vue";
import ItemSalePeriod from "../components/SellAnItem/ItemSalePeriod/Section.vue";

</script>
 
<template>
    <main id="main-section">
        <div class="mb-3">
            <h4 class="link-offset-3">Sell your Item (<span id="sell-an-item-position" class="sell-an-item-position fw-lighter">1</span>/6)</h4>
            <p class="text-danger d-none create-item-error"></p>
        </div>

        <Category></Category>
        <ItemName></ItemName>
        <ImageUpload></ImageUpload>
        <ItemCondition></ItemCondition>
        <ItemPrice></ItemPrice>
        <ItemSalePeriod></ItemSalePeriod>

        <div class="mt-4">
            <input type="hidden" id="user-id" :value="`${userId}`">
            <div class="d-inline">
                <button type="button" id="prev-section" class="btn btn-dark disabled fs-4" onclick="prevSection()">Prev</button>
            </div>
            <div class="d-inline float-end" id="next-item-section">
                <button type="button" id="next-section" class="btn btn-dark fs-4" onclick="nextSection()">Next</button>
            </div>
            <div class="d-inline float-end d-none" id="submit-item-section">
                <button type="submit" role="submit" id="submit-item" class="btn btn-dark fs-4" onclick="createItem()">Finish</button>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        computed: {
            userId(){
                return this.$store.state.auth.id;
            },
            userIsLoggedIn(){
                return this.$store.getters.isLoggedIn;
            },
            userIsAdmin(){
                return this.$store.state.auth.role=='admin';
            }
        },
        mounted() {
            if(!this.userIsLoggedIn){
                this.$router.push("login");
            }
            if(this.userIsLoggedIn && this.userIsAdmin){
                this.$router.push("");
            }

            // change the position of the current body to 0
            pos = 0;
        }
    }
</script>