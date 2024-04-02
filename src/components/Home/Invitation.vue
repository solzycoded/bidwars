<template>
    <div class="position-relative">
        <div class="w-100">
            <img src="/imgs/vintage-car.jpg" alt="invitation to signup picture" class="img-fluid invitation-img">
        </div>
        
        <div class="position-absolute bottom-0 start-0 top-0 end-0 bg-dark opacity-75">
        </div>
        <div class="position-absolute bottom-0 start-0 end-0 text-white">
            <div class="invitation-message-container">
                <h5>Do you have an item you don't need anymore?</h5>
                <h6 class="mb-3">We <b class="text-danger">host auctions</b> for items like yours.</h6>
                <p>Come make some money off it!</p>
                <RouterLink to="/sell-an-item" class="btn btn-danger fw-bold fs-4">Sell your Item</RouterLink>
            </div>
        </div>
    </div>
</template>