import React, {Component, JSX} from 'react';
import "./CoinCounterLap.css"
import {generateItemsInHTML, getTimeDifferenceFormatted} from "../../../methods/methods";
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

    handleRemoveLapTime(event: any, index: number) {
        event.stopPropagation();
        event.preventDefault();

        const {lapTimes} = this.state;
        lapTimes.splice(index, 1);
        this.setState({lapTimes})
    }

    render() {
        const {lapTimes} = this.state;

        let lapItems: Array<JSX.Element> = lapTimes.map((lap,i) => {
            return <li className={"lap-item"}>
                <span className={"lap-time"}>
                    { lap.date.toLocaleTimeString() } | { getTimeDifferenceFormatted(lapTimes[i-1]?.date, lap.date) }
                </span>

                <span className={"lap-money"}>
                    This lap: €{(lap.currentMoney - lap.lastLapMoney).toFixed(2)},
                    total: €{lap.currentMoney.toFixed(2)}
                </span>
                <span className="lap-remove" onClick={(e) => this.handleRemoveLapTime(e, i)}>
                    &times;
                </span>
            </li>
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
