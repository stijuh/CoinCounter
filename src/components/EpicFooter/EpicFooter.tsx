import React from "react";
import "./EpicFooter.scss"

function EpicFooter() {
    return (
        <footer>
            <div className="g-container">
                <div className="g-wrap">
                    <div className="g-footer">
                        {(() => {
                            return Array.from(
                                { length: 50 },
                                (_, i) => (<div key={"bubble-" + i} className="g-bubble"></div>)
                            );
                        })()}
                    </div>
                </div>
            </div>
            <p className={"date"}>2023</p>

            <a className={"studioStoyLink"} href="https://studiostoy.nl" target="_blank">$tudio $toy</a>
        </footer>
    );
}

export default EpicFooter;