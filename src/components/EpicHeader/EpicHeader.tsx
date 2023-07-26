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

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleKeyDownEvent = (event:any) => {
        if (event.key === "Enter")
            this.openInfo();
    }

    handleDocumentClick = (event:any) => {
        const modalContent = document.querySelector(".info-modal-content");
        if (modalContent && !modalContent.contains(event.target) && this.state.isOpen)
            this.closeInfo();
    };

    // The event listeners here are a little retarded, but I couldn't be bothered redo everything properly :D.
    openInfo = () => {
        document.removeEventListener('click', this.handleDocumentClick);

        this.setState(
            { isOpen: true },
            () => setTimeout(() => document.addEventListener('click', this.handleDocumentClick), 10)
        );
    };

    closeInfo = () => {
        this.setState(() => ({
            isOpen: false
        }));

        document.removeEventListener('click', this.handleDocumentClick);
    }

    render() {
        const {isOpen} = this.state;

        return (
            <>
                <header>
                    <div className={"logo"} onClick={this.openInfo}>
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
