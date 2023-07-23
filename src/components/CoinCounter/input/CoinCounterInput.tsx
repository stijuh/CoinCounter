import React, {ChangeEvent, Component} from 'react';
import "./CoinCounterInput.css"
import TimePicker from "../../TimePicker/TimePicker";
import CoinButton from "../../Common/CoinButton";
import {format} from 'date-fns';
import {CoinCounterInputState, CoinCounterInputUpdate} from "../domain/CoinCounterModels";

const startTimeId = "startTime"
const endTimeId = "endTime"
const breakFromTimeId = "breakFromTime"
const breakToTimeId = "breakToTime"

const startDefault = new Date(2000, 1, 1, 9, 0, 0);
const endDefault = new Date(2000, 1, 1, 17, 0, 0);
const breakFromDefault = new Date(2000, 1, 1, 12, 30);
const breakToDefault = new Date(2000, 1, 1, 13, 0, 0);

export default class CoinCounterInput extends Component<CoinCounterInputUpdate, CoinCounterInputState> {

    constructor(props: CoinCounterInputUpdate) {
        super(props);
        this.state = {
            earnedPerHour: 0,
            times: {
                startTime: startDefault,
                endTime: endDefault,
                breakFromTime: breakFromDefault,
                breakToTime: breakToDefault,
            },
            isOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);

        try {
            this.updateSalaryFromLocalStorage()
            this.updateTimesFromLocalStorage()
        } catch {
        }
    }

    componentWillUnmount() {
        // Remove event listener when the component unmounts to prevent memory leaks
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            this.closeModal();
        }
    };

    /* ### Retrieving and setting data from localstorage. ### */
    updateTimesFromLocalStorage() {
        let savedTimes = localStorage.getItem('times')
        if (savedTimes !== undefined) {
            const {times} = this.state;
            let dateStrings = JSON.parse(String(savedTimes))

            times.startTime = new Date(dateStrings.startTime)
            times.endTime = new Date(dateStrings.endTime)
            times.breakFromTime = new Date(dateStrings.breakFromTime)
            times.breakToTime = new Date(dateStrings.breakToTime)

            this.setState({times})
        }
    }

    updateSalaryFromLocalStorage() {
        let earnedPerHour = Number(localStorage.getItem('salary'))
        if (earnedPerHour !== undefined) {
            this.setState({earnedPerHour})
        }
    }

    /* ### functions for handling input changes ### */
    handleCoinsPerHourChange = (event: ChangeEvent<HTMLInputElement>) => {
        const earnedPerHour = Number(event.target.value);
        this.setState({earnedPerHour})
        localStorage.setItem('salary', JSON.stringify(earnedPerHour));
    };

    handleTimeChange = (event: ChangeEvent<HTMLInputElement>, identifier: string) => {
        const time = String(event.target.value); // expecting it in the format of 00:00:00 (hours:minutes:seconds).
        let timeProperties = time.split(":")

        let dateComparison = new Date(2000, 1, 1, 0, 0, 0);
        dateComparison.setHours(parseInt(timeProperties[0]), parseInt(timeProperties[1]), 0)

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

        this.setState({times})
        localStorage.setItem('times', JSON.stringify(this.state.times));
    };

    makeSomeMoney = () => {
        this.props.readyForMoneyMaking(this.state.earnedPerHour, this.state.times);
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    closeModal = () => {
        this.setState(() => ({
            isOpen: false
        }));
    }

    render() {
        const {isOpen, times, earnedPerHour} = this.state;

        let salary: number | string = earnedPerHour

        if (earnedPerHour <= 0)
            salary = ""

        return (
            <>
                <CoinButton text={"Get ready"} onClick={this.toggleModal}></CoinButton>

                <div className={"modal" + (isOpen ? " active" : "")}>
                    <div className={"modal-content" + (isOpen ? " active" : "")}>
                        <span className="close" onClick={this.toggleModal}>&times;</span>

                        <label className={"hourDescription"}>Earned per hour:
                            <input className={"hourInput"} type="number" placeholder="0" value={salary}
                                   onChange={this.handleCoinsPerHourChange}/>
                        </label>

                        <div className={"timePickers"}>
                            <TimePicker
                                identifier={startTimeId}
                                defaultTime={format(times.startTime, "hh:mm:ss")}
                                description={"Start time:"}
                                handleTimeChange={this.handleTimeChange}/>
                            <TimePicker
                                identifier={endTimeId}
                                defaultTime={format(times.endTime, "kk:mm:ss")}
                                description={"End time:"}
                                handleTimeChange={this.handleTimeChange}/>
                            <TimePicker
                                identifier={breakFromTimeId}
                                defaultTime={format(times.breakFromTime, "kk:mm:ss")}
                                description={"break from:"}
                                handleTimeChange={this.handleTimeChange}/>
                            <TimePicker
                                identifier={breakToTimeId}
                                defaultTime={format(times.breakToTime, "kk:mm:ss")}
                                description={"to:"}
                                handleTimeChange={this.handleTimeChange}/>
                        </div>

                        <CoinButton text={"Let's make some money!"} onClick={this.makeSomeMoney}></CoinButton>
                    </div>
                </div>
            </>
        );
    }
}

