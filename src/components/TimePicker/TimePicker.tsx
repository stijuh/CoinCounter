import React, {ChangeEvent, Component} from 'react';
import "./TimePicker.css"

interface timeProps {
    identifier: string // "startTime"
    defaultTime: string // "09:00:00"
    description: string // "Start time:"
    handleTimeChange: (event: ChangeEvent<HTMLInputElement>, identifier: string) => void;
}

export default class TimePicker extends Component<timeProps, {}> {

    constructor(props: timeProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div id={this.props.identifier}>
            <label className={"description"}>{this.props.description}
                <input  type="time"
                       defaultValue={this.props.defaultTime}
                       pattern="[0-9]{2}:[0-9]{2}"
                       minLength={5} maxLength={5}
                       onChange={(event) => this.props.handleTimeChange(event, this.props.identifier)} />
            </label>
        </div>
    }
}
