import { h, Component } from 'preact';
import worker from './worker';
import style from './style';

export default class Home extends Component {

	togglePlay = e => {
		console.log(this.state.isPlaying);
		this.setState({
			isPlaying: !this.state.isPlaying
		}, () => {
			if (this.state.isPlaying) {
				this.state.synth.pause();
			}
			else {
				this.state.synth.resume();
			}
		});
	};

	stopSpeech = () => {
		this.state.synth.cancel();
	};

	constructor(props) {
		super(props);

		this.state = {
			synth: window.speechSynthesis,
			isPlaying: false
		};
	}

	componentDidMount() {
		const myWorker = new Worker(worker);
		
		myWorker.onmessage = (e) => {
			// console.log(e.data);
			const sayThis = new SpeechSynthesisUtterance(e.data);
			this.state.synth.speak(sayThis);
		};
		const pdfjsLib = window['pdfjs-dist/build/pdf'];
		let loadingTask = pdfjsLib.getDocument('./assets/cover-letter.pdf');
		loadingTask.promise.then((doc) => {
			console.log(`Number of pages: ${doc.numPages}`);
			doc.getPage(1).then((page) => {
				page.getTextContent().then((text) => {
					myWorker.postMessage(text);
				});
			});
		});
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<button onClick={this.togglePlay}>Pause podcast</button>
				<button onClick={this.stopSpeech}>Stop podcast</button>
			</div>
		);
	}

}
