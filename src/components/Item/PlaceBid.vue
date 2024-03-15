<template>
    <!-- modal for bid offer -->
    <div class="modal fade" id="bid-offer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="bid-offerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 fw-lighter" id="bid-offerLabel">Place Bid for <span id="bid-offer-title" class="fw-bold">Item X</span></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <p>Selling price is <b class="text-danger" id="bid-offer-price">$1000</b></p>
                        <div class="form-group">
                            <label for="bid-offer" class="mb-2 fw-bold">What's your offer?</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="offer-sign">£</span>
                                <input type="number" class="form-control" placeholder="Enter offer for item" aria-label="offer" aria-describedby="offer-sign" min="1">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="text-secondary send-offer-auction-details text-end">
                        <p class="text-danger m-0">430 bids placed</p>
                        <p class="m-0">Auction ends in <small class="text-danger fw-bolder">1:20:34</small></p>
                    </div>
                    <button type="button" class="btn btn-primary">Send offer</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END modal for bid offer -->
</template>