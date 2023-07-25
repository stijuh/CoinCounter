import React, {Component} from "react";
import "./EpicHeader.css"
import logo from "../../logo.svg";
import InfoMenu from "../InfoMenu/InfoMenu";

interface InfoMenuModalState {
    isOpen: boolean
}

export default class EpicHeader extends Component<{}, InfoMenuModalState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleInfo = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    closeInfo = () => {
        this.setState(() => ({
            isOpen: false
        }));
    };

    handleKeyDownEvent = (event:any) => {
        if (event.key === "Enter")
            this.toggleInfo();
    }

    render() {
        const {isOpen} = this.state;

        return (
            <>
                <header>
                    <div className={"logo"} onClick={this.toggleInfo}>
                        <img src={logo} className="App-logo" alt="logo" tabIndex={0} onKeyDown={this.handleKeyDownEvent}/>
                    </div>
                    <p className="text">Because time is money!</p>
                </header>

                <div className={"info-menu" + (isOpen ? " active" : "")}>
                    <InfoMenu handleClose={this.closeInfo}/>
                </div>
            </>
        );
    }
}
