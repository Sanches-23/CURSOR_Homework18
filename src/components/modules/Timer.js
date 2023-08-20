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
        // if (prevState.time !== this.state.time && this.state.time === 0) {
        //     clearInterval(this.timerID);
        //     this.props.onTimeEnd();
        // }
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






// import React from "react";
// import timerStyle from "../styles/Timer.module.css";
//
// class Timer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             time: this.props.time,
//             step: this.props.step,
//             isRunning: this.props.autostart,
//         };
//         this.milliseconds = this.props.time * 1000;
//         this.radius = 30; // Ваш радіус
//         this.circumference = this.radius * 2 * Math.PI;
//     }
//
//     tick = () => {
//         if (this.state.time > 0) {
//             this.setState(prevState => ({
//                 time: prevState.time - 1,
//             }));
//         } else {
//             clearInterval(this.timerID);
//             this.setState({
//                 isRunning: false,
//             });
//             this.props.onTimeEnd();
//         }
//     };
//
//     handleReset = () => {
//         clearInterval(this.timerID);
//         this.setState({
//             time: this.props.time,
//             step: this.props.step,
//             isRunning: false,
//         });
//         this.props.onTimeEnd();
//     };
//
//     handleStartStop = () => {
//         this.setState(
//             prevState => ({
//                 isRunning: !prevState.isRunning,
//             }),
//             () => {
//                 if (this.state.isRunning) {
//                     this.timerID = setInterval(this.tick, this.state.step);
//                     this.props.onTimeStart();
//                 } else {
//                     clearInterval(this.timerID);
//                     this.props.onTimePause();
//                 }
//             }
//         );
//     };
//
//     componentDidMount() {
//         if (this.state.isRunning) {
//             this.timerID = setInterval(this.tick, this.state.step);
//         }
//     }
//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }
//
//     strokeDashoffset = () =>
//         this.circumference -
//         (this.state.time / this.props.time) * this.circumference;
//
//     render() {
//         const { time, isRunning } = this.state;
//
//         return (
//             <div className={timerStyle.timerContainer}>
//                 <div>
//                     <button
//                         // style={{
//                         //     fontSize: "16px",
//                         //     padding: "15px 40px",
//                         //     margin: "10px auto 30px",
//                         //     display: "block",
//                         //     backgroundColor: "#4d4d4d",
//                         //     color: "lightgray",
//                         //     border: "none",
//                         //     cursor: "pointer",
//                         //     outline: 0,
//                         //     opacity: isRunning ? 0.4 : 1,
//                         //     pointerEvents: isRunning ? "none" : "all",
//                         // }}
//                         onClick={!isRunning ? this.handleStartStop : () => {}}
//                     >
//                         {isRunning ? "Пауза" : "Старт"}
//                     </button>
//                 </div>
//                 <div
//                     style={Object.assign(
//                         {}, timerStyle.countdownContainer, timerStyle.countdownSizeStyles)}>
//                     <p style={timerStyle.textStyles}>
//                         {Math.floor(time / 3600).toString().padStart(2, "0")}:
//                         {Math.floor((time % 3600) / 60).toString().padStart(2, "0")}:
//                         {Math.floor(time % 60).toString().padStart(2, "0")}
//                     </p>
//                     <svg style={timerStyle.svg}>
//                         <circle
//                             strokeDasharray={this.circumference}
//                             strokeDashoffset={isRunning ? this.strokeDashoffset() : 0}
//                             r={this.radius}
//                             cx={this.radius}
//                             cy={this.radius}
//                             fill="none"
//                             strokeLinecap="round"
//                             stroke="lemonchiffon"
//                             strokeWidth="5"
//                         ></circle>
//                     </svg>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default Timer;
