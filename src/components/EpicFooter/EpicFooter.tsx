import React from "react";
import "./EpicFooter.scss"

function EpicFooter() {
    return (
        <footer>
            {/*<span className={"date"}>@2023</span>*/}

            <div className={"foot"}>
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
            </div>

            <a className={"studioStoyLink"} href="https://studiostoy.nl" target="_blank">$tudio $toy</a>
        </footer>
    );
}

export default EpicFooter;