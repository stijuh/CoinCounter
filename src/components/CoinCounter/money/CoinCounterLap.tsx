import React, {Component, JSX} from 'react';
import "./CoinCounterLap.css"
import {generateItemsInHTML} from "../../../methods/methods";
import {LapTime} from "../domain/ModelImplementations";
import {CoinCounterLapProps, CoinCounterLapState} from "../domain/CoinCounterModels";

export default class CoinCounterLap extends Component<CoinCounterLapProps, CoinCounterLapState> {

    constructor(props: CoinCounterLapProps) {
        super(props);
        this.state = {
            lapTimes: []
        };
    }

    addLap() {
        const {lapTimes} = this.state;

        let lastLapMoneyCount: number = 0;
        if (lapTimes.length !== 0) {
            let lastLap = lapTimes.at(lapTimes.length-1);
            if (lastLap !== undefined)
                lastLapMoneyCount = lastLap.currentMoney
        }

        lapTimes.push(new LapTime(this.props.currentMoney, lastLapMoneyCount, new Date()))
        this.setState({lapTimes})
    }

    render() {
        const {lapTimes} = this.state;

        let lapItems: Array<JSX.Element> = lapTimes.map((lap,i) => {
            return <li className={"lap-item"}>
                {lap.date.toLocaleTimeString()} |
                this lap: €{lap.currentMoney - lap.lastLapMoney},
                total: €{lap.currentMoney}</li>
        });

        return (
            <>
                <span className={"lapContainer"}>
                    <ul className={"laps"}>
                        {generateItemsInHTML(lapTimes.length, undefined, lapItems)}
                    </ul>
                </span>
            </>
        );
    }
}
