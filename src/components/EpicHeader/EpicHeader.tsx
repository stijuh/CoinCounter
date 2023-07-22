import React from "react";
import "./EpicHeader.css"
import logo from "../../logo.svg";

function EpicHeader() {
    return (
        <header>
            <img src={logo} className="App-logo" alt="logo" />
            <p className="text">Because time is money!</p>
        </header>
    );
}

export default EpicHeader;