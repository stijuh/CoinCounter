import React, { Component } from 'react';
import {CoinCounterState, MoneyState} from "../domain/CoinCounterModels";
import "./CoinCounterMoney.css"

export default class CoinCounterMoney extends Component<CoinCounterState, MoneyState> {
    private interval: NodeJS.Timeout | undefined;

    constructor(props: CoinCounterState) {
        super(props);
        this.state = {
            money: 0,
        };
    }

    componentDidUpdate(prevProps: CoinCounterState) {
        const { eurosPerHour } = this.props;
        if (eurosPerHour !== prevProps.eurosPerHour) {
            this.stopInterval();
            this.startInterval();
        }
    }

    startInterval() {
        const { eurosPerHour, times } = this.props;
        this.interval = setInterval(() => {
            let hoursWorked = 0;
            let currentTime = new Date();

            if (currentTime > this.timedDate(times.endTime))
                hoursWorked = this.getTimeDifference(times.startTime, times.endTime);
            else if (currentTime < this.timedDate(times.startTime))
                hoursWorked = 0;
            else
                hoursWorked = this.getTimeDifference(times.startTime, currentTime);

            this.setState(() => ({
                money: (hoursWorked * eurosPerHour)
            }));
        }, 1000);
    }

    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    getTimeDifference(firstDate: Date, secondDate: Date) {
        const first = this.timedDate(firstDate)
        let firstTime = first.getTime();

        const second = this.timedDate(secondDate)
        let secondTime = second.getTime();

        return Math.abs(((firstTime - secondTime) / 60000) / 60) // difference in hours, e.g. 90min --> 1.5 hours.
    }

    // Returns a date that is "empty" e.g. it is the date of today, with only the time properties of the given date.
    timedDate(fullDate: Date): Date {
        const timeOnlyDate = new Date()
        timeOnlyDate.setHours(fullDate.getHours(), fullDate.getMinutes(), fullDate.getSeconds())
        timeOnlyDate.setHours(fullDate.getHours(), fullDate.getMinutes(), fullDate.getSeconds())
        return timeOnlyDate;
    }

    render() {
        const { money } = this.state;

        return (
            <div className={"wrapper"}>
                <span className={"moneyMoney"}>€{money.toFixed(2)}</span>
            </div>
        );
    }
}
