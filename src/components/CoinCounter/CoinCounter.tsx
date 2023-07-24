import React, {Component} from 'react';
import {CoinCounterState} from "./domain/CoinCounterModels";
import CoinCounterInput from "./input/CoinCounterInput";
import CoinCounterMoney from "./money/CoinCounterMoney";
import CoinCounterLap from "./money/CoinCounterLap";

import "./CoinCounter.css"
import CoinButton from "../Common/CoinButton";

export default class CoinCounter extends Component<{}, CoinCounterState> {

    private readonly coinCounterLapRef

    constructor(props: {}) {
        super(props);

        // Create a ref for CoinCounterLap
        this.coinCounterLapRef = React.createRef<CoinCounterLap>();

        this.state = {
            money: 0,
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

    updateMoney = (money: number) => {
        this.setState({money})
    }

    handleAddLap = () => {
        // Access the CoinCounterLap component using the ref and call its addLap function
        if (this.coinCounterLapRef.current) {
            this.coinCounterLapRef.current.addLap();
        }
    };

    render() {
        return (
            <>
                <div className={"wrapper"}>
                    <CoinCounterMoney eurosPerHour={this.state.eurosPerHour} times={this.state.times} updateMoney={this.updateMoney}/>
                    <CoinCounterLap ref={this.coinCounterLapRef} currentMoney={this.state.money}></CoinCounterLap>
                </div>

                <div className={"user-input"}>
                    <CoinCounterInput readyForMoneyMaking={this.handleStateUpdate}/>
                    <CoinButton onClick={this.handleAddLap} text={"Add lap"}/>
                </div>
            </>
        );
    }
}
