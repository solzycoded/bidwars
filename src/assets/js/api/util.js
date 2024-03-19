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
}