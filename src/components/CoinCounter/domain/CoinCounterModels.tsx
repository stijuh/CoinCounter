export interface MoneyState {
    money: number;
}

export interface CoinCounterState {
    eurosPerHour: number;
    times: {
        startTime: Date;
        endTime: Date;
        breakFromTime: Date;
        breakToTime: Date;
    }
}