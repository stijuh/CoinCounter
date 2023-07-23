import {ChangeEvent} from "react";

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

// Coin Counter Input
export interface CoinCounterInputUpdate {
    readyForMoneyMaking: (
        earnedPerHour: number,
        times: { startTime: Date; endTime: Date; breakFromTime: Date; breakToTime: Date; }
    ) => void;
}

export interface CoinCounterInputState {
    earnedPerHour: number;
    times: {
        startTime: Date;
        endTime: Date;
        breakFromTime: Date;
        breakToTime: Date;
    }
    isOpen: boolean;
}

export interface timeProps {
    identifier: string // "startTime"
    defaultTime: string // "09:00:00"
    description: string // "Start time:"
    handleTimeChange: (event: ChangeEvent<HTMLInputElement>, identifier: string) => void;
}
