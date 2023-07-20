import React from "react";
import "./EpicHeader.css"
import logo from "../../logo.svg";

function EpicHeader() {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Coin Counter</h1>
            <p className="text">Because time is money!</p>
        </div>
    );
}

export default EpicHeader;