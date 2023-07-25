import React, {Component} from 'react';
import "./InfoMenu.css"

interface CloseHandler {
    handleClose: () => void
}

export default class InfoMenu extends Component<CloseHandler, {}> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: CloseHandler) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        // Remove event listener when the component unmounts to prevent memory leaks
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" || event.key === "Enter") {
            this.props.handleClose();
        }
    };

    render() {
        return (
            <>
                <div className={"info-modal"}>
                    <div className={"info-modal-content"}>
                        <span className="close" onClick={this.props.handleClose} tabIndex={0}>&times;</span>

                        <h1>Coin Counter</h1>

                        <ul className={"reasons-to-enlist"}>
                            <li>Are you tired of slogging through mountains of mundane tasks like some kind of
                                unfortunate desk-bound Olympian?
                            </li>
                            <li>Do you crave a monetary carrot dangling in front of your nose, urging you to rise above
                                the sea of mediocrity?
                            </li>
                            <li>Are you an aspiring millionaire or a penny-pincher on the brink of a financial
                                revolution?
                            </li>
                        </ul>

                        <p className={"listen-up"}>If the above applies to you, then listen up, because we've got the
                            answer you've been waiting for!</p>

                        <p className={"information"}>
                            Welcome, all you monetary-focused bean counters, to the spectacular world of <strong>Coin
                            Counter! </strong>
                            This ain't your run-of-the-mill mundane accountancy application, Oh no!
                            It's a glorious symphony of capitalism and productivity,
                            designed to keep those gears turning while you rake in the dough!

                            <br/>
                            <br/>

                            Say goodbye to your mediocre existence and hello to the life of a monetarily stimulated
                            titan!
                            With the <strong>Coin Counter</strong>, you're not just some ordinary war hero, no sir!
                            You're a profit-pursuing, number-crunching, task-conquering dynamo!

                            <br/>
                            <br/>

                            Besides, who needs peace and tranquility when you can have constant reminders of your
                            financial inadequacy?

                            <br/>
                            <br/>

                            Cave Johnson, we're done here.
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
