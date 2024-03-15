<template>
    <!-- carousel (upcoming auctions) -->
    <section>
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                <div>
                    <img src="/imgs/vintage-car.jpg" class="d-block w-100" alt="auction item image" style="max-height: 500px;">
                </div>
                <div class="carousel-caption d-none d-md-block text-white">
                    <h4 class="text-decoration-underline">Upcoming Auctions</h4>
                    <br>
                    <h5>1982 Cortina</h5>
                    <p>Auction Date: 12th Feb, 2024</p>
                    <p>In <b class="text-danger">48:24:34</b></p>
                    <div>
                        <button type="button" class="btn btn-dark text-white fw-bolder" style="font-size: 20px;">Remind me</button>
                    </div>
                </div>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <div>
                        <img src="/imgs/vintage-car.jpg" class="d-block w-100" alt="auction item image" style="max-height: 500px;">
                    </div>
                    <div class="carousel-caption d-none d-md-block text-white">
                        <h4 class="text-decoration-underline">Upcoming Auctions</h4>
                        <br>
                        <h5>2002 Mercedez Benz Something</h5>
                        <p>Auction Date: 12th Feb, 2024</p>
                        <p>In <b class="text-danger">48:24:34</b></p>
                        <div>
                            <button type="button" class="btn btn-dark text-white fw-bolder" style="font-size: 20px;">Remind me</button>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                <div>
                    <img src="/imgs/vintage-car.jpg" class="d-block w-100" alt="auction item image" style="max-height: 500px;">
                </div>
                <div class="carousel-caption d-none d-md-block text-white">
                    <h4 class="text-decoration-underline">Upcoming Auctions</h4>
                    <br>
                    <h5>1960 Cortina Royale</h5>
                    <p>Auction Date: 12th Feb, 2024</p>
                    <p>In <b class="text-danger">48:24:34</b></p>
                    <div>
                    <button type="button" class="btn btn-dark text-white fw-bolder" style="font-size: 20px;">Remind me</button>
                    </div>
                </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </section>
</template>