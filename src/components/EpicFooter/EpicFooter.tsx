import React from "react";
import "./EpicFooter.scss"
import {generateItemsInHTML} from "../../methods/methods";

function EpicFooter() {
    return (
        <footer>
            <div className="g-footer">
                {generateItemsInHTML(50, (<div key={"bubble"} className="g-bubble"></div>))}
            </div>

            <p className={"date"}>Coin Counter 2023</p>
            <a className={"studioStoyLink"} href="https://studiostoy.nl" target="_blank">$tudio $toy</a>
        </footer>
    );
}

export default EpicFooter;