import React, {Component} from 'react';
import {CoinCounterState} from "./domain/CoinCounterModels";
import CoinCounterInput from "./input/CoinCounterInput";
import CoinCounterMoney from "./money/CoinCounterMoney";

class CoinCounter extends Component<{}, CoinCounterState> {

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
                <CoinCounterInput readyForMoneyMaking={this.handleStateUpdate}/>
            </>
        );
    }
}

export default CoinCounter;
