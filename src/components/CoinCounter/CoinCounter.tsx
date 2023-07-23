import React, {Component} from 'react';
import {CoinCounterState} from "./domain/CoinCounterModels";
import CoinCounterInput from "./input/CoinCounterInput";
import CoinCounterMoney from "./money/CoinCounterMoney";
// import CoinCounterLap from "./money/CoinCounterLap";

import "./CoinCounter.css"

export default class CoinCounter extends Component<{}, CoinCounterState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            eurosPerHour: 0,
            times: {breakFromTime: new Date(), breakToTime: new Date(), endTime: new Date(), startTime: new Date()}
        };
    }

    handleStateUpdate = (eurosPerHour: number, times: {
        startTime: Date;
        endTime: Date;
        breakFromTime: Date;
        breakToTime: Date;
    }) => {
        this.setState({eurosPerHour, times})
    }

    render() {
        return (
            <>
                <CoinCounterMoney eurosPerHour={this.state.eurosPerHour} times={this.state.times}/>

                <div className={"buttons"}>
                    <CoinCounterInput readyForMoneyMaking={this.handleStateUpdate}/>
                    {/*<CoinCounterLap></CoinCounterLap>*/}
                </div>
            </>
        );
    }
}
