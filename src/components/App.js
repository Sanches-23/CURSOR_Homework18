import React from 'react';
import './styles/App.css';
import inputStyle from './styles/input.module.css';
import switchStyle from './styles/switch.module.css';
import Timer from "./modules/Timer";
import timerStyle from "./styles/Timer.module.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "",
            step: "",
            autostart: true,
            initialized: false,
        }
    }

    handleChange = (name, value) => {
        if (!isNaN(parseInt(value))) {
            this.setState({ [name]: parseInt(value) });
        }
    }
    handleAutostartChange = event => {
        const { checked } = event.target;
        this.setState({ autostart: checked });
    }
    handleInitialize = () => {
        this.setState({ initialized: true });
    }

    render() {
        const { time, step, autostart, initialized } = this.state;

        const onTimeStart = () => {
            console.log("Таймер запущено!");
        }
        const onTimePause = () => {
            console.log("Таймер на паузі! (ZA WARUDO!)");
        }
        const onTimeEnd = () => {
            console.log("Час вийшов по морозиво!");
        }

        return (
            <div className="App">
                <header className="App-header">
                    <span>Autostart:</span>
                    <label className={switchStyle.switch}>
                        <input type="checkbox"
                            checked={autostart}
                            onChange={this.handleAutostartChange}
                        />
                        <span className={`${switchStyle.slider} ${switchStyle.round}`}></span>
                    </label>
                    <div className={`${inputStyle.form__group} ${inputStyle.field}`}>
                        <input type="text" className={inputStyle.form__field} placeholder=""
                            value={time}
                            onChange={event => this.handleChange("time", event.target.value)}
                        />
                        <label className={inputStyle.form__label}>Time</label>
                    </div>
                    <div className={`${inputStyle.form__group} ${inputStyle.field}`}>
                        <input type="text" className={inputStyle.form__field} placeholder=""
                            value={step}
                            onChange={event => this.handleChange("step", event.target.value)}
                        />
                        <label className={inputStyle.form__label}>Step</label>
                    </div>
                    <button className={initialized ? timerStyle.disabledBtn : timerStyle.btn}
                            onClick={this.handleInitialize} disabled={initialized}>Ініціалізувати
                    </button>
                    {initialized && (
                        <Timer
                            time={time}
                            step={step}
                            autostart={autostart}
                            onTimeStart={onTimeStart}
                            onTimePause={onTimePause}
                            onTimeEnd={onTimeEnd}
                        />
                    )}
                </header>
            </div>
        );
    }
}

export default App;
