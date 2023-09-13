import React from "react";
import timerStyle from "../styles/Timer.module.css"

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time,
            step: this.props.step,
            isRunning: this.props.autostart,
        };
    }

    tick = () => {
        if (this.state.time > 0) {
            this.setState(prevState => ({
                time: prevState.time - 1
            }));
        } else {
            clearInterval(this.timerID);
            this.setState({
                isRunning: false
            });
            this.props.onTimeEnd();
        }
    }

    handleReset = () => {
        clearInterval(this.timerID);
        this.setState({
            time: this.props.time,
            step: this.props.step,
            isRunning: false
        });
        this.props.onTimeEnd();
    }

    handleStartStop = () => {
        this.setState(prevState => ({
            isRunning: !prevState.isRunning
        }), () => {
            if (this.state.isRunning) {
                this.timerID = setInterval(this.tick, this.state.step);
                this.props.onTimeStart();
            } else {
                clearInterval(this.timerID);
                this.props.onTimePause();
            }
        });
    }

    componentDidMount() {
        if (this.state.isRunning) {
            this.timerID = setInterval(this.tick, this.state.step);
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.time)
    }

    render() {
        const { time, isRunning } = this.state;
        return (
            <div className={timerStyle.timerContainer}>
                <h2>
                    {Math.floor(time / 3600).toString().padStart(2, '0')}:
                    {Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:
                    {Math.floor(time % 60).toString().padStart(2, '0')}
                </h2>
                <div className={timerStyle.btnContainer}>
                    <button className={timerStyle.btn} onClick={this.handleStartStop}>
                        {isRunning ? 'Пауза' : 'Старт'}
                    </button>
                    <button className={timerStyle.btn} onClick={this.handleReset}>Оновити</button>
                </div>
            </div>
        );
    }
}

export default Timer;