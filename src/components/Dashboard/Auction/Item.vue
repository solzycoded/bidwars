<script setup>
import { App } from "../../../assets/js/util/app.js";

const props = defineProps(['item', 'adminToken']);
</script>

<template>
    <th scope="row">1</th>
    <td>{{ item.title }}</td>
    <td>{{ item.category }}</td>
    <td>{{ item.auction_date }}</td>
    <td>{{ item.auction_start }}</td>
    <td>{{ item.auction_end }}</td>
    <td>
        <div class="d-flex justify-content-start">
            <RouterLink class="btn btn-secondary p-1 me-3" :to="`/items/${item.title}`">View</RouterLink>
            <form @submit.prevent="deleteAuctionItem">
                <p class="fw-bold text-danger">{{ error }}</p>
                <input type="hidden" name="token" v-model="token">
                <input type="hidden" name="auction_room_id" v-model="auctionRoomId">
                <button type="submit" class="btn btn-danger">Remove</button>
            </form>
        </div>
    </td>
</template>

<script>
    export default {
        data() {
            return {
                token: null,
                auctionRoomId: null,
                error: ""
            }
        },
        methods: {
            deleteAuctionItem(){
                let allowDelete = confirm("The selected item will now be removed");

                if(allowDelete){
                    let data = { token: this.token };

                    (new FetchRequest("DELETE", `api/auction-rooms/${this.auctionRoomId}`, data)).send(this.successResponse, this.failureResponse);
                }
            },
            successResponse(data){
                let row = document.querySelector(`.auction-item-row[auction-id='auction-${this.item.auction_room_id}']`);

                if(row!=null){
                    row.classList.add('d-none');

                    App.alert(true, data.message);
                }
            },
            failureResponse(data){
                App.alert(false, data.message);
            },
            setAuctionRoomId(){
                this.auctionRoomId = this.item.auction_room_id;
            },
            setAuctionToken(){
                this.token = this.adminToken;
            }
        },
        mounted(){
            this.setAuctionRoomId();
            this.setAuctionToken();
        }
    }
</script>