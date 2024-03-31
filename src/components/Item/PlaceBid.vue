<script setup>
import { ref } from "vue";
import { App } from "../../assets/js/util/app.js";

// let countDown = ref("00:00:00");

// App.startCountDown(countDown, itemDetails.auction_end);
</script>

<template>
    <!-- modal for bid offer -->
    <div class="modal fade" id="bid-offer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="bid-offerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 fw-lighter" id="bid-offerLabel">Place Bid for <span id="bid-offer-title" class="fw-bold">Item X</span></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="sendOffer">
                    <div class="modal-body">
                        <div>
                            <p>Sellers price is <b class="text-danger" id="bid-offer-price">$1000</b></p>
                            <div class="form-group">
                                <p class="text-danger">{{ error }}</p>
                                <label for="bid-offer" class="mb-2 fw-bold">What's your offer?</label>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="offer-sign">£</span>
                                    <input type="hidden" id="offer-item-id">
                                    <input type="number" class="form-control" placeholder="Enter offer for item" aria-label="offer" aria-describedby="offer-sign" min="1" v-model="offer">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="text-secondary send-offer-auction-details text-end">
                            <p class="text-danger m-0"><span id="offer-number-of-bids"></span> bids placed</p>
                            <p class="m-0">Auction ends in <small class="text-danger fw-bolder" id="offer-auction-countdown"></small></p>
                        </div>
                        <button type="submit" class="btn btn-dark">Send offer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- END modal for bid offer -->
</template> 

<script>
    export default {
        data() {
            return {
                offer: null,
                bidder: this.$store.state.auth.id,
                error: null
            }
        },
        methods: {
            sendOffer(){
                let data   = {offer: this.offer, bidder: this.bidder};
                let itemId = document.querySelector("#offer-item-id").value;

                (new FetchRequest("POST", `api/items/${itemId}/bids`, data)).send(this.successResponse, this.failureResponse);
            },
            successResponse(data){
                App.alert(true, `Your offer has been received!`);
                document.querySelector(".btn-close").click();
            },
            failureResponse(data){
                this.error = data.message;
                App.alert(false, data.message);
            }
        },
        computed: {
            isAdmin(){
                return this.$store.state.auth.role=='admin';
            }
        }
    }
</script>