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
            let hoursWorked = 0, currentTime = new Date();

            // It is after the specified end time.
            if (currentTime > this.timedDate(times.endTime)) {
                hoursWorked = this.getTimeDifferenceInHours(times.startTime, times.endTime);
            }
            // It is before the specified start time.
            else if (currentTime < this.timedDate(times.startTime)) {
                hoursWorked = 0;
            }
            // It is during the specified break time.
            else if (this.timedDate(times.breakFromTime) < currentTime && currentTime < this.timedDate(times.breakToTime)) {
                // Take the hours of startTime till breakFromTime.
                hoursWorked = this.getTimeDifferenceInHours(times.startTime, times.breakFromTime)
            // It is after the specified break time but still work time.
            } else if (currentTime > this.timedDate(times.breakToTime)) {
                hoursWorked = this.getTimeDifferenceInHours(times.startTime, times.breakFromTime) +
                    this.getTimeDifferenceInHours(times.breakToTime, currentTime);
            } else {
                hoursWorked = this.getTimeDifferenceInHours(times.startTime, currentTime);
            }

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

    getTimeDifferenceInHours(firstDate: Date, secondDate: Date) {
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
