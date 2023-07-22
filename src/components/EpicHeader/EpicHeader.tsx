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

    render() {
        const {isOpen} = this.state;

        return (
            <>
                <header>
                    <div className={"logo"} onClick={this.toggleInfo}>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <p className="text">Because time is money!</p>
                </header>

                <div className={"info-menu" + (isOpen ? " active" : "")} onClick={this.closeInfo}>
                    <InfoMenu handleClose={this.closeInfo}/>
                </div>
            </>
        );
    }
}
