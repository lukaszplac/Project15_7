class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.reset();
        this.print(this.times);
    }

    reset() {
    	this.times = {
    		minutes: 0,
    		seconds: 0,
    		miliseconds: 0
    	};
    }

    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
    	if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() {
	    if (!this.running) return;
	    this.calculate();
	    this.print();
	}

	calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
    	}
    if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
    	}
	}

	stop() {
        if (this.running) this.save(this.times);
	    this.running = false;
	    clearInterval(this.watch);
	}

    hardReset() {
        this.reset();
        this.print();
        this.clearList();
        if (this.running) this.running = false;
    }

    save(t) {
        var li = document.createElement('li');
        var liText = document.createTextNode(`${pad0(t.minutes)}:${pad0(t.seconds)}:${pad0(Math.floor(t.miliseconds))}`);
        li.appendChild(liText);
        this.results.appendChild(li);
    }

    clearList() {
        this.results.innerHTML = '';
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));
var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());
var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.hardReset());

//ES6
class App extends React.Component {

    constructor(stopwatch) {
        super(props);
        this.props.stopwatch = stopwatch;
    }

    static defaultProps = {
        stopwatch: {}
    };

    static propTypes = {
        stopwatch: React.PropTypes.number.isRequired
    };

    render() {
        return (<div className='stopwatch'>

                </div>
            );
    }
}

const app = new App(new Stopwatch());
ReactDOM.render(app, document.getElementById('container'));

