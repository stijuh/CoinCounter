import React, {Component} from 'react';
import {CoinCounterState} from "./domain/CoinCounterModels";
import CoinCounterInput from "./input/CoinCounterInput";
import CoinCounterMoney from "./money/CoinCounterMoney";

class CoinCounter extends Component<{}, CoinCounterState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            eurosPerHour: 0,
        };
    }

    handleStateUpdate = (eurosPerHour: number) => {
        this.setState({eurosPerHour})
    }

    render() {
        return (
            <>
                <CoinCounterMoney eurosPerHour={this.state.eurosPerHour}/>
                <CoinCounterInput readyForMoneyMaking={this.handleStateUpdate}/>
            </>
        );
    }
}

export default CoinCounter;
