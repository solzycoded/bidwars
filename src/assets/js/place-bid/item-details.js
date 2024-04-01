class PlaceBid{
    constructor(today = new Date()){
        this.today = today;

        this.hour        = this.today.getHours();
        this.minutes     = this.today.getMinutes();
    }

    static itemDetails(target){
        let itemId = target.getAttribute("item-id");

        getElementById("offer-item-id").value = itemId;

        new FetchRequest('GET', `api/items/${itemId}/id`, ).send(PlaceBid.getItemDetailsSuccess, PlaceBid.getItemDetailsFailure);
    }

    static getItemDetailsSuccess(data){
        PlaceBid.setItemValues(data);
    }

    static getItemDetailsFailure(data){
        console.log(data);
    }

    static setItemValues(item){
        getElementById("bid-offer-title").innerHTML = item.title;
        getElementById("bid-offer-price").innerHTML = PlaceBid.appendCurrency(PlaceBid.formatNumber(item.price));

        let numberOfBidsTag = getElementById("offer-number-of-bids");

        if(numberOfBidsTag!=null){
            numberOfBidsTag.innerHTML = item.total_bids;

            // start countdown for offer modal
            PlaceBid.startCountDown(getElementById("offer-auction-countdown"), item.auction_end);
        }

        let ownerIdTag = document.querySelector("#modal-owner-id");

        ownerIdTag.value = item.user_id;

        PlaceBid.checkUserIsOwner(ownerIdTag.value);
    }

    static checkUserIsOwner(ownerId){
        let loggedInUserId = document.querySelector("#logged-in-user").value;
        let userIsOwner    = loggedInUserId==ownerId;

        let offerTag        = document.querySelector("#bid-offer-input");
        let submitOfferBtn  = document.querySelector("#send-offer");
        let ownerMessageTag = document.querySelector("#owner-message");

        if(userIsOwner){
            offerTag.disabled = true;
            submitOfferBtn.disabled = true;
            ownerMessageTag.innerHTML = "This is your Item, bruv. You can't place a bid on it!";
        }
        else{
            offerTag.removeAttribute("disabled");
            submitOfferBtn.removeAttribute("disabled");
            ownerMessageTag.innerHTML = "";
        }
    }

    static formatNumber(number) {
        return Intl.NumberFormat().format(number);
    }

    static appendCurrency(target, currency = "£"){
        return currency + target;
    }

    static async startCountDown(target, to){
        const placeBid = new PlaceBid();

        // Set the date we're counting down to
        let date  = placeBid.getTodaysDate() + " ";
        to        = placeBid.formatToTime(to);

        let countDownDate = new Date(date + to).getTime();

        // Update the count down every 1 second
        let x = setInterval(function() {
            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            target.innerHTML = placeBid.formatDateChar(hours) + ":" + placeBid.formatDateChar(minutes) + ":" + placeBid.formatDateChar(seconds);

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                target.innerHTML = "EXPIRED";
            }
        }, 500);
    }

    formatDateChar(character){
        return character.toString().length == 1 ? '0' + character : character;
    }

    formatTime(){
        let hour    = this.today.getHours();
        let minutes = this.today.getMinutes();

        const time = `${this.formatDateChar(hour)}:${this.formatDateChar(minutes)}`;

        return time;
    }

    getTodaysDate(){
        let year        = this.today.getFullYear();
        let month       = this.today.getMonth() + 1;
        let day         = this.today.getDate();

        let date        = `${year}-${month}-${day}`;

        return date;
    }

    formatToTime(to){
        let splitTo = to.split(":");

        let hour = splitTo[0];

        if(Number(hour) > 23){
            splitTo[0] = hour==24 ? "00" : hour==25 ? "01" : "02";

            return splitTo.join(":");
        }

        return to;
    }
}