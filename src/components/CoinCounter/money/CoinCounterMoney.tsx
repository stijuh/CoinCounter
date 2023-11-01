import React, {Component} from 'react';
import {CoinCounterProps, MoneyState} from "../domain/CoinCounterModels";
import "./CoinCounterMoney.css"
import {getTimeDifferenceInHours, timeFromDate} from "../../../methods/methods";

export default class CoinCounterMoney extends Component<CoinCounterProps, MoneyState> {
    private interval: NodeJS.Timeout | undefined;

    constructor(props: CoinCounterProps) {
        super(props);
        this.state = {
            money: 0
        }
    }

    componentDidUpdate(prevProps: CoinCounterProps) {
        const {eurosPerHour} = this.props;
        if (eurosPerHour !== prevProps.eurosPerHour) {
            this.stopInterval();
            this.startInterval();
        }
    }

    startInterval() {
        const {eurosPerHour, times} = this.props;
        this.interval = setInterval(() => {
            let hoursWorked: number, currentTime = new Date();

            // It is after the specified end time.
            if (currentTime > timeFromDate(times.endTime)) {
                hoursWorked = getTimeDifferenceInHours(times.startTime, times.endTime);
                hoursWorked -= getTimeDifferenceInHours(times.breakFromTime, times.breakToTime);
            }
            // It is before the specified start time.
            else if (currentTime < timeFromDate(times.startTime)) {
                hoursWorked = 0;
            }
            // It is during the specified break time.
            else if (timeFromDate(times.breakFromTime) < currentTime && currentTime < timeFromDate(times.breakToTime)) {
                // Take the hours of startTime till breakFromTime.
                hoursWorked = getTimeDifferenceInHours(times.startTime, times.breakFromTime)
            // Start time is after the break time, and it is currently after the specified break time but still work time.
            } else if (timeFromDate(times.startTime) < timeFromDate(times.breakToTime) && currentTime > timeFromDate(times.breakToTime)) {
                hoursWorked = getTimeDifferenceInHours(times.startTime, times.breakFromTime) +
                    getTimeDifferenceInHours(times.breakToTime, currentTime);
            } else {
                hoursWorked = getTimeDifferenceInHours(times.startTime, currentTime);
            }

            let money: number = (hoursWorked * eurosPerHour)
            this.props.updateMoney(money)
            this.setState({money});
        }, 1000);
    }

    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const {money} = this.state;

        return (
            <div className={"wrapper"}>
                <span className={"moneyMoney"}>€{money.toFixed(2)}</span>
            </div>
        );
    }
}
