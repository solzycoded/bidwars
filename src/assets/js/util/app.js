export class App {
    static formatNumber(number) {
        return Intl.NumberFormat().format(number);
    }

    static appendCurrency(target, currency = "£"){
        return currency + target;
    }
}