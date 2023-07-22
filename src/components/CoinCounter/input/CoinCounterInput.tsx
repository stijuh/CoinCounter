import React, { Component, ChangeEvent } from 'react';
import "./CoinCounterInput.css"
import TimePicker from "../../TimePicker/TimePicker";
import CoinButton from "../../Common/CoinButton";

interface CoinCounterInputUpdate {
    readyForMoneyMaking: (
        eurosPerHour: number,
        times: {startTime: Date; endTime: Date; breakFromTime: Date; breakToTime: Date; }
    ) => void;
}

interface CoinCounterInputState {
    eurosPerHour: number;
    times: {
        startTime: Date;
        endTime: Date;
        breakFromTime: Date;
        breakToTime: Date;
    }
    isOpen: boolean;
}

const startTimeId = "startTime"
const endTimeId = "endTime"
const breakFromTimeId = "breakFromTime"
const breakToTimeId = "breakToTime"

const startDefault = new Date(2000, 1, 1,9,0, 0);
const endDefault = new Date(2000, 1, 1,17,0, 0);
const breakFromDefault = new Date(2000, 1, 1, 12, 30);
const breakToDefault = new Date(2000, 1, 1,13,0, 0);

export default class CoinCounterInput extends Component<CoinCounterInputUpdate, CoinCounterInputState> {

    constructor(props: CoinCounterInputUpdate) {
        super(props);
        this.state = {
            eurosPerHour: 0,
            times: {
                startTime: startDefault,
                endTime: endDefault,
                breakFromTime: breakFromDefault,
                breakToTime: breakToDefault,
            },
            isOpen: false
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    handleCoinsPerHourChange = (event: ChangeEvent<HTMLInputElement>) => {
        const eurosPerHour = Number(event.target.value);
        this.setState({ eurosPerHour })
    };

    handleTimeChange = (event: ChangeEvent<HTMLInputElement>, identifier: string) => {
        const time = String(event.target.value); // expecting it in the format of 00:00 (hours:minutes).
        let timeList = time.split(":")

        let dateComparison = new Date(2000, 1, 1,0,0, 0);
        dateComparison.setHours(parseInt(timeList[0]), parseInt(timeList[1]), 0)

        const {times} = this.state
        switch (identifier) {
            case startTimeId:
                times.startTime = dateComparison;
                break;
            case endTimeId:
                times.endTime = dateComparison;
                break;
            case breakFromTimeId:
                times.breakFromTime = dateComparison;
                break;
            case breakToTimeId:
                times.breakToTime = dateComparison;
                break;
        }

        this.setState({times} )
        //TODO: persist the time state in localstorage so it isn't reset every refresh.
    };

    makeSomeMoney = () => {
        this.props.readyForMoneyMaking(this.state.eurosPerHour, this.state.times);
        this.toggleModal();
    }

    render() {
        const { isOpen } = this.state;

        return (
            <div>
                <CoinButton text={"Get ready"} onClick={this.toggleModal}></CoinButton>

                <div className={"modal" + (isOpen ? " active" : "")}>
                    <div className={"modal-content" + (isOpen ? " active" : "")}>
                        <span className="close" onClick={this.toggleModal}>&times;</span>

                        <label className={"hourDescription"} >Earned per hour:
                            <input className={"hourInput"} type="number" placeholder="0" onChange={this.handleCoinsPerHourChange} />
                        </label>

                        <div className={"timePickers"}>
                            <TimePicker identifier={startTimeId} defaultTime={"09:00:00"} description={"Start time:"} handleTimeChange={this.handleTimeChange} />
                            <TimePicker identifier={endTimeId} defaultTime={"17:00:00"} description={"End time:"} handleTimeChange={this.handleTimeChange} />
                            <TimePicker identifier={breakFromTimeId} defaultTime={"12:30:00"} description={"break from:"} handleTimeChange={this.handleTimeChange} />
                            <TimePicker identifier={breakToTimeId} defaultTime={"13:00:00"} description={"to:"} handleTimeChange={this.handleTimeChange} />
                        </div>

                        <CoinButton text={"Let's make some money!"} onClick={this.makeSomeMoney}></CoinButton>
                    </div>
                </div>

            </div>
        );
    }
}

