export class App {
    constructor(){
        this.today = new Date();

        this.hour        = this.today.getHours();
        this.minutes     = this.today.getMinutes();
    }

    getStartTime(){
        return `${this.hour}:${this.minutes}:00`; 
    }

    getEndTime(hourIncrement = 2){
        let endHour = this.hour + hourIncrement;

        let endTime = `${endHour}:${this.minutes}:00`;

        return endTime;
    }

    getTodaysDate(){
        let year        = this.today.getFullYear();
        let month       = this.today.getMonth() + 1;
        let day         = this.today.getDate();

        let date = `${year}-${month}-${day}`;

        return date;
    }

    static rand(target = 36){
        return Math.random().toString(target).substr(2); // remove `0.`
    };

    static token() {
        return App.rand() + App.rand();
    };
}