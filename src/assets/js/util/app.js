export class App {
    constructor(today = new Date()){
        this.today = today;

        this.hour        = this.today.getHours();
        this.minutes     = this.today.getMinutes();
    }

    getDate(format = false){
        return this.getTodaysDate(format);
    }

    convertFrom24To12Format(){
        const time24 = this.formatTime();

        const [sHours, mins] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'AM' : 'PM';
        const hours  = +sHours % 12 || 12;

        return `${this.formatDateChar(hours)}:${mins} ${period}`;
    }

    formatTime(){
        let hour    = this.today.getHours();
        let minutes = this.today.getMinutes();

        const time = `${this.formatDateChar(hour)}:${this.formatDateChar(minutes)}`;

        return time;
    }

    getTodaysDate(format = false){
        let year  = this.today.getFullYear();

        let month = this.today.getMonth() + 1;
        month     = format ? this.formatDateChar(month) : month;

        let day   = this.today.getDate();
        day       = format ? this.formatDateChar(day) : day;

        let date  = `${year}-${month}-${day}`;

        return date;
    }

    static formatNumber(number) {
        return Intl.NumberFormat().format(number);
    }

    static appendCurrency(target, currency = "£"){
        return currency + target;
    }

    static async startCountDown(target, to, aSelector = false){
        const app = new App();

        // Set the date we're counting down to
        let date  = app.getTodaysDate() + " ";
        to        = app.formatToTime(to);

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

            let countDown = app.formatDateChar(hours) + ":" + app.formatDateChar(minutes) + ":" + app.formatDateChar(seconds);

            if(aSelector){
                target.innerHTML = countDown;
            }
            else{
                target.value = countDown;
            }

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);

                if(aSelector){
                    target.innerHTML = countDown;
                }
                else{
                    target.value = countDown;
                }
            }
        }, 500);
    }

    formatDateChar(character){
        return character.toString().length == 1 ? '0' + character : character;
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

    formatDistance(countDownDate, now){
        if(countDownDate > now){
            return countDownDate - now;
        }

        return now - countDownDate;
    }

    static generateNumbers(start, end){
        let arr = [];

        for (let index = start; index <= end; index++) {
            arr.push(index);
        }

        return arr;
    }

    static alert(isSuccess, message){
        let alert = document.querySelector("#alert");

        let alertClassList = alert.classList;
        
        alertClassList.remove("d-none");

        // display message
        let alertMessageTag = document.querySelector(".alert-message-content");
        alertMessageTag.innerHTML = message;

        // set alert background color
        let alertBtn          = document.querySelector(".alert-btn");
        let alertBtnClassList = alertBtn.classList;

        if(isSuccess){
            alertBtnClassList.add("bg-success");
            alertBtnClassList.remove("bg-danger");
        }
        else{
            alertBtnClassList.add("bg-danger");
            alertBtnClassList.remove("bg-success");
        }

        // trigger the btn to disappear
        setTimeout(() => {
            alertClassList.add("d-none");
        }, 7000);
    }
}