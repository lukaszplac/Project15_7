//ES6 ReactElement
class Stopwatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            results: []
        }
    }

    reset = () => {
        this.setState({
                minutes: 0,
                seconds: 0,
                miliseconds: 0      
        })
    }

    render() {
        const currentTime = {
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            miliseconds: this.state.miliseconds 
        }
        return (
                <div className="container">
                    <nav className="controls">
                      <a href="#" className="button" id="start" onClick={this.start}>Start</a>
                      <a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
                      <a href="#" className="button" id="reset" onClick={this.hardReset}>Reset</a>
                    </nav>
                    <div className="stopwatch">
                        {this.format(currentTime)}
                    </div>
                    <ul className="results">
                        {this.state.results.map(r => <li key={this.keyCreator(r)}>{this.format(r)}</li>)}
                    </ul>
                </div>
            )
    }

    keyCreator = (r) => {
        let key = r.seconds.toString() + r.miliseconds.toString() + r.minutes.toString();
        return key;
    }

    format = (t) => {
        return `${this.pad0(t.minutes)}:${this.pad0(t.seconds)}:${this.pad0(Math.floor(t.miliseconds))}`;
    }

    start = () => {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step = () => {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate = () => {
        this.setState({miliseconds: this.state.miliseconds+1});
        if (this.state.miliseconds >= 100) {
        this.setState({seconds: this.state.seconds+1});
        this.setState({miliseconds: 0});
        }
        if (this.state.seconds >= 60) {
        this.setState({minutes: this.state.minutes+1});
        this.setState({seconds: 0});
        }
    }

    stop = () => {
        let currentTime = {
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            miliseconds: this.state.miliseconds 
        }
        if (this.state.running) this.save(currentTime);
        this.setState({running: false});
        clearInterval(this.watch);
    }

    hardReset = () => {
        this.reset();
        this.clearList();
        if (this.state.running) this.setState({running: false});
    }

    save = (t) => {
        this.setState({results: [...this.state.results, t]});
    }

    clearList = () => {
        this.setState({results: []});
    }

    pad0 = (value) => {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
        }
    return result;
    }

}

const stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById('app'));
