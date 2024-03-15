<script setup>
import LiveAuctionRoom from './Item.vue'
</script>

<template>
    <!-- Live Auction (rooms) -->
    <section class="live-auction-section">
        <div class="text-center mb-4">
          <h5>Rooms</h5>
        </div>
        <div class="container-fluid">
            <div class="row">
                <LiveAuctionRoom></LiveAuctionRoom>
                <LiveAuctionRoom></LiveAuctionRoom>
            <!-- <div class="col-12 col-sm-12 col-md-4 col-lg-6 mb-3">
              <div class="shadow mb-5 bg-body rounded">
                <div class="d-flex justify-content-start">
                  <div><img src="imgs/vintage-car.jpg" class="img-fluid" alt="auction room image"></div>
                  <div><img src="imgs/vintage-car.jpg" class="img-fluid" alt="auction room image"></div>
                  <div><img src="imgs/vintage-car.jpg" class="img-fluid" alt="auction room image"></div>
                </div>
          
                  <div class="p-3">
                    <div>
                      <div class="d-inline fw-bold">Room 101</div>
                      <div class="d-inline text-danger float-end">1000 bids so far</div>
                    </div>
                    <div class="mt-2">
                      <div class="d-inline text-secondary pe-2"><a class="text-decoration-none" href="#">Vintage Cars</a></div>
                      <div class="d-inline text-secondary pe-2"><a class="text-decoration-none" href="#">Vintage Cars</a></div>
                      <div class="d-inline text-secondary pe-2"><a class="text-decoration-none" href="#">Vintage Cars</a></div>
                    </div>
        
                    <div class="mt-2">
                      <p class="d-inline text-secondary pe-2">1984 Cortina, </p>
                      <p class="d-inline text-secondary pe-2">Little Finger from Game of Thrones, </p>
                      <p class="d-inline text-secondary pe-2">Little Finger from Game of Thrones</p>
                    </div>
                    <div class="mt-4">
                      <div class="d-inline">
                        <a class="btn btn-outline-dark fw-bold" href="/live-auctions/room-x">Preview</a>
                      </div>
                      <div class="d-inline float-end">
                        <a class="btn btn-dark fw-bold" href="/live-auctions/room-x">Join Room</a>
                      </div>
                    </div>
                  </div>
              </div>
            </div> -->
          </div>
        </div>

    </section>
</template>