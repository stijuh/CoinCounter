import React, {Component} from 'react';
import "./TimePicker.css"
import {timeProps} from "../CoinCounter/domain/CoinCounterModels";

export default class TimePicker extends Component<timeProps, {}> {

    constructor(props: timeProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <div id={this.props.identifier}>
            <label className={"description"}>{this.props.description}
                <input type="time"
                       value={this.props.defaultTime}
                       pattern="[0-9]{2}:[0-9]{2}"
                       minLength={5} maxLength={5}
                       onChange={(event) => this.props.handleTimeChange(event, this.props.identifier)}/>
            </label>
        </div>
    }
}
