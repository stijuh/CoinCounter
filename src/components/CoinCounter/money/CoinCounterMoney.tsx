import React, { Component } from 'react';
import {CoinCounterProps, MoneyState} from "../domain/CoinCounterModels";
import "./CoinCounterMoney.css"

export default class CoinCounterMoney extends Component<CoinCounterProps, MoneyState> {
    private interval: NodeJS.Timeout | undefined;

    constructor(props: CoinCounterProps) {
        super(props);
        this.state = {
            money: 0,
        };
    }

    componentDidMount() {
        this.startInterval();
    }

    componentDidUpdate(prevProps: CoinCounterProps) {
        const { eurosPerHour } = this.props;

        console.log("updated")

        if (eurosPerHour !== prevProps.eurosPerHour) {
            this.setState({ money: 0 }, () => {
                this.stopInterval();
                this.startInterval();
            });
        }
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    startInterval() {
        const { eurosPerHour } = this.props;
        this.interval = setInterval(() => {
            this.setState((prevState) => ({
                money: prevState.money + (eurosPerHour) / 3600
            }));
        }, 1000);
    }

    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
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
