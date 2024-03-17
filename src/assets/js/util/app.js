export class App {
    constructor(){
        this.today = new Date();

        this.hour        = this.today.getHours();
        this.minutes     = this.today.getMinutes();
    }

    getTodaysDate(){
        let year        = this.today.getFullYear();
        let month       = this.today.getMonth() + 1;
        let day         = this.today.getDate();

        let date        = `${year}-${month}-${day}`;

        return date;
    }

    static formatNumber(number) {
        return Intl.NumberFormat().format(number);
    }

    static appendCurrency(target, currency = "£"){
        return currency + target;
    }

    static async startCountDown(target, to = "17:03:00"){
        const app = new App();

        let date  = app.getTodaysDate() + " ";
        // Set the date we're counting down to
        let countDownDate = new Date(date + to).getTime();

        // Update the count down every 1 second
        let x = setInterval(function() {
            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            target.value = app.formatDateChar(hours) + ":" + app.formatDateChar(minutes) + ":" + app.formatDateChar(seconds);

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                target.value = "EXPIRED";
            }
        }, 500);
    }

    formatDateChar(character){
        return character.toString().length == 1 ? '0' + character : character;
    }
}