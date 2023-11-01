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
        // Remove event listeners when the component unmounts to prevent memory leaks
        window.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('click', this.handleDocumentClick);
    }

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

        console.log(time);
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

        this.setState({ times })
        localStorage.setItem('times', JSON.stringify(this.state.times));
    };

    makeSomeMoney = () => {
        this.props.readyForMoneyMaking(this.state.earnedPerHour, this.state.times);
        this.closeModal();
    }

    /* event inputs */

    handleKeyDown = (event: any) => {
        if (event.key === "Escape") {
            this.closeModal();
        }
    };

    handleCloseKeyDown = (event: any) => {
        if (event.key === "Enter"){
            this.closeModal();
        }
    }

    // The event listeners here are a little retarded, but I couldn't be bothered redo everything properly :D.
    openModal = () => {
        document.removeEventListener('click', this.handleDocumentClick);

        this.setState(
            { isOpen: true },
            () => setTimeout(() => document.addEventListener('click', this.handleDocumentClick), 10)
        );
    };

    closeModal = () => {
        this.setState(() => ({
            isOpen: false
        }));

        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick = (event:any) => {
        const modalContent = document.querySelector(".modal-content");
        if (modalContent && !modalContent.contains(event.target) && this.state.isOpen)
            this.closeModal();
    };

    render() {
        const {isOpen, times, earnedPerHour} = this.state;

        let salary: number | string = earnedPerHour

        if (earnedPerHour <= 0)
            salary = ""

        return (
            <>
                <CoinButton text={"Get ready"} onClick={this.openModal}></CoinButton>

                <div className={"modal" + (isOpen ? " active" : "")}>
                    <div style={{visibility : (isOpen ? "visible" : "hidden")}} className={"modal-content" + (isOpen ? " active" : "")}>
                        <span className="close" onKeyDown={this.handleCloseKeyDown} onClick={this.closeModal} tabIndex={0}>&times;</span>

                        <label className={"hourDescription"}>Earned per hour:
                            <input className={"hourInput"} type="number" placeholder="0" value={salary}
                                   onChange={this.handleCoinsPerHourChange}/>
                        </label>

                        <div className={"timePickers"}>
                            <TimePicker
                                identifier={startTimeId}
                                defaultTime={format(times.startTime, "kk:mm:ss")}
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

