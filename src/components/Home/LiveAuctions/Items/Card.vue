<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="item in liveAuctionItems" :key="item.id">
        <div class="position-relative">
            <div>
                <img :src="item.image" class="img-thumbnail w-100 h-100 live-auction-item-image" alt="live auction image">
            </div>
            <div class="">
                <p class="fw-bold m-0 live-auction-item-name text-capitalize">{{ item.title }}</p>
                <p class="text-danger m-0">{{ item.bid_number }} bids so far</p>
            </div>
            <a href="item-details.html/?item=item.title" class="position-absolute bottom-0 top-0 end-0 start-0"></a>
        </div>
    </div>
</template>