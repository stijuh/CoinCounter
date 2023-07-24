import {Laptime} from "./CoinCounterModels";

export class LapTime implements Laptime {
    date: Date;
    currentMoney: number;
    lastLapMoney: number;

    constructor(money:number, lastLapMoney:number, date: Date) {
        this.currentMoney = money;
        this.date = date;
        this.lastLapMoney = lastLapMoney;
    }
}