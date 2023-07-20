import React, { Component, ChangeEvent } from 'react';
import "./CoinCounterInput.css"
import TimePicker from "../../TimePicker/TimePicker";
import CoinButton from "../../Common/CoinButton";

interface CoinCounterInputUpdate {
    readyForMoneyMaking: (eurosPerHour: number) => void;
}

interface CoinCounterInputState {
    eurosPerHour: number;
    isOpen: boolean;
}


const startTimeId = "startTime"
const endTimeId = "endTime"
const breakFromTimeId = "breakFromTime"
const breakToTimeId = "breakToTime"

export default class CoinCounterInput extends Component<CoinCounterInputUpdate, CoinCounterInputState> {

    constructor(props: CoinCounterInputUpdate) {
        super(props);
        this.state = {
            eurosPerHour: 0,
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
        const time = String(event.target.value);
        console.log(identifier, time)
    };

    makeSomeMoney = () => {
        this.props.readyForMoneyMaking(this.state.eurosPerHour);
        this.toggleModal();
    }

    render() {
        const { isOpen } = this.state;

        return (
            <div>
                <CoinButton text={"Get ready"} onClick={this.toggleModal}></CoinButton>

                {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.toggleModal}>&times;</span>

                        <label>Earned per hour:
                            <input type="number" placeholder="0" onChange={this.handleCoinsPerHourChange} />
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
                )}
            </div>
        );
    }
}

