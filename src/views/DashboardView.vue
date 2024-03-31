<script setup>
import AuctionList from "../components/Dashboard/Auction/List.vue";
import { App } from "../assets/js/util/app.js";

</script>

<template>
    <section id="main-section">
        <div class="container-fluid p-0 mb-5">
            <div class="mb-3 fw-bold">
                <h3>Set Auction</h3>
            </div>
            <hr>
            <form @submit.prevent="submitAuction">
                <div class="w-75">
                    <div class="mb-3" v-show="error">
                        <p class="text-bold text-danger text-small">{{ error }}</p>
                    </div>
                    <div class="mb-3">
                        <label for="select-room" class="mb-2 fw-bold">Auction Room</label>
                        <select id="select-room" class="form-select form-select-sm text-capitalize" aria-label=".form-select-sm example" v-model="selectedRoom">
                            <option selected value="" disabled>Select Room</option>
                            <option v-for="room in rooms" :value="`${room.id}`">Room {{ room.room_tag }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="available-items" class="mb-2 fw-bold">Select Items for this room</label>
                        <select id="available-items" class="form-select text-capitalize" multiple aria-label="multiple select example" v-model="selectedItems">
                            <option v-for="item in availableItems" :value="`${item.id}`">{{ item.title }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <h5>Schedule Auction</h5>
                        <div class="mb-2">
                            <label for="available-items" class="mb-2 fw-bold">Select date</label>
                            <input type="date" name="auction_date" id="auction-date" class="form-control" :min="`${(new App()).getTodaysDate(true)}`" v-model="selectedDate">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="mb-2">
                            <label for="select-from-time" class="fw-bold mb-2">From</label>
                            <div class="input-group" id="select-from-time">
                                <select class="form-select form-select-sm select-from-hour" v-model="fromHour" @change="calculateToHour">
                                    <option selected disabled value="">Hour</option>
                                    <option v-for="hour in hours" :value="`${hour}`">{{ (new App()).formatDateChar(hour) }}</option>
                                </select>
                                <select class="form-select form-select-sm select-from-mins" v-model="fromMins" @change="displayToMins">
                                    <option selected disabled value="">Mins</option>
                                    <option v-for="min in mins" :value="`${min}`">{{ (new App()).formatDateChar(min) }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-1">
                            <label for="select-from-time" class="fw-bold mb-2">To</label>
                            <div class="input-group" id="select-from-time">
                                <input type="text" name="to_Hour" id="to-hour" class="form-control p-1" v-model="toHour" readonly placeholder="Hour">
                                <input type="text" name="to_Hour" id="to-hour" class="form-control p-1" v-model="toMins" readonly placeholder="Mins">
                            </div>
                        </div>
                        <div class="mt-3 float-end">
                            <button type="submit" class="btn btn-dark">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <br>
        <div class="mb-5 mt-3">
            <div class="mb-3">
                <h4>Auctions</h4>
            </div>
            <hr>
            <div>
                <div>
                    <div class="mb-3">
                        <div class="mb-3 w-50">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text rounded-end-0" id="select-auction-room">Room</span>
                                </div>
                                <select id="select-auction-room" class="form-select form-select-sm text-capitalize" aria-label=".form-select-sm example" v-model="selectedAuctionRoom" @change="shuffleAuctionItems">
                                    <option selected value="">Room X</option>
                                    <option v-for="room in rooms" :value="`${room.id}`">{{ room.room_tag }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="form-floating">
                                <select class="form-select form-select-md" id="acquisition-post-condition" aria-label="select a condition" v-model="selectedAuctionDate" @change="shuffleAuctionItems">
                                    <option selected value="">all dates</option>
                                    <option v-for="date in auctionDates" :value="`${date.auction_date}`">{{ date.auction_date }}</option>
                                </select>
                                <label for="acquisition-post-condition">Select a date</label>
                            </div>
                            <div class="form-floating">
                                <select class="form-select form-select-md" id="acquisition-post-condition" aria-label="select a condition" v-model="selectedAuctionTime" @change="shuffleAuctionItems">
                                    <option selected value="">all</option>
                                    <option v-for="startTime in auctionStartTimes" :value="`${startTime.auction_start}`">{{ startTime.auction_start }}</option>
                                </select>
                                <label for="acquisition-post-condition">Select auction start time</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- table / list of auction items -->
                <AuctionList :items="items" :token="token"></AuctionList>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        data() {
            return {
                message: "something",
                isSuccess: false,
                token: this.$store.state.auth.token,
                hours: App.generateNumbers(0, 21),
                mins: App.generateNumbers(1,59),
                rooms: [],
                selectedRoom: '',
                selectedItems: [],
                selectedDate: '',
                fromHour: '',
                fromMins: '',
                toHour: '',
                toMins: '',
                availableItems: [],
                error: "",
                selectedAuctionRoom: "",
                selectedAuctionDate: "",
                selectedAuctionTime: "",
                auctionDates: [],
                auctionStartTimes: [],
                items: []
            };
        },
        methods: {
            shuffleAuctionItems(){
                let data = {room_id: this.selectedAuctionRoom, date: this.selectedAuctionDate, time: this.selectedAuctionTime};

                const getItems = (itemList) => {
                    this.items = itemList;
                }

                new FetchRequest("POST", `api/auction-rooms/items/filter`, data).send(getItems, getItems);
            },
            getItemsInRooms(){
                const getItems = (itemList) => {
                    this.items = itemList;
                }

                new FetchRequest("GET", `api/auction-rooms/items/all`).send(getItems, getItems);
            },
            getAuctionDates(){
                const getListOfAuctionDates = (dateList) => {
                    this.auctionDates = dateList;
                }

                new FetchRequest("GET", `api/auction-rooms/dates/all`).send(getListOfAuctionDates, getListOfAuctionDates);
            },
            getAuctionStartTimes(){
                const getListOfAuctionStartTimes = (startTimeList) => {
                    this.auctionStartTimes = startTimeList;
                }

                new FetchRequest("GET", `api/auction-rooms/start-times/all`).send(getListOfAuctionStartTimes, getListOfAuctionStartTimes);
            },
            authorize(){
                if(!this.$store.getters.isLoggedIn || this.role!='admin'){
                    this.$router.push('/');
                }
            },
            submitAuction(){
                let data = {room_id: this.selectedRoom, items: this.selectedItems, auction_date: this.selectedDate, auction_start: `${this.fromHour}:${this.fromMins}`, auction_end: `${this.toHour}:${this.toMins}`};

                (new FetchRequest("POST", "api/auction-rooms", data)).send(this.successResponse, this.failureResponse);
            },
            successResponse(data){
                this.resetFields();
                // reload available items
                this.getAvailableItems();

                this.getAuctionDates();
                this.getAuctionStartTimes();
                this.getItemsInRooms();

                alert("Auction was successfully scheduled!");
            },
            resetFields(){
                this.selectedRoom = "";
                this.selectedItems = [];
                this.selectedDate = '';
                this.fromHour = '';
                this.fromMins = '';
                this.toHour = '';
                this.toMins = '';
                this.error = "";

                this.selectedAuctionRoom = "";
                this.selectedAuctionDate = "";
                this.selectedAuctionTime = "";
            },
            failureResponse(data){
                this.error = data.message;
            },
            getAvailableItems(){
                const items = (itemList) => {
                    this.availableItems = itemList;
                }

                new FetchRequest("GET", `api/items/all/available`).send(items, items);
            },
            calculateToHour(){
                let toHour = (new App()).formatDateChar(Number(this.fromHour) + 2);
                this.toHour = toHour;
            },
            displayToMins(){
                this.toMins = (new App()).formatDateChar(this.fromMins);
            },
            upcomingAuctions(){ // room, date, start
                const getAuctionRooms = (listOfRooms) => {
                    this.auctionRooms = listOfRooms;
                }

                new FetchRequest("GET", `api/auction-rooms/upcoming`).send(getAuctionRooms, getAuctionRooms);
            },
            loadAuctionRooms(){
                const displayRooms = (roomList) => {
                    this.rooms = roomList;
                }

                new FetchRequest("GET", `api/rooms/all`).send(displayRooms, displayRooms);
            }
        },
        mounted(){
            this.authorize();
            this.getAvailableItems();
            this.loadAuctionRooms();
            this.getAuctionDates();
            this.getAuctionStartTimes();
            this.getItemsInRooms();
        },
        computed: {
            role(){
                return this.$store.state.auth.role;
            }
        }
    };
</script>