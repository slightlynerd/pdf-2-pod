import { h, Component } from 'preact';
import { route } from 'preact-router';
import Header from '../../components/header';
import worker from './worker';
import style from './style';

export default class Podcast extends Component {

	// convert base64 into uint8 array
	convertDataURIToBinary(dataURI) {
		const BASE64_MARKER = ';base64,';
		const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		const base64 = dataURI.substring(base64Index);
		const raw = window.atob(base64);
		const rawLength = raw.length;
		const array = new Uint8Array(new ArrayBuffer(rawLength));

		for (let i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	}

	playSpeech = () => {
		this.state.synth.resume();
	};
	
	pauseSpeech = () => {
		this.state.synth.pause();
	};

	// stop speech
	stopSpeech = () => {
		this.state.synth.cancel();
	};

	async readPDF(data) {
		const pdfjsLib = window['pdfjs-dist/build/pdf'];
		this.state.myWorker = new Worker(worker);
		this.state.myWorker.onmessage = (e) => {
			const sayThis = new SpeechSynthesisUtterance(`Page ${e.data.pageNumber}. ` + e.data.text);
			this.state.synth.speak(sayThis);
		};

		let loadingTask = pdfjsLib.getDocument(data);
		const doc = await loadingTask.promise;
		for (let i = 1; i <= doc.numPages; i++) {
			const page = await doc.getPage(i);
			const pageText = await page.getTextContent();
			this.state.myWorker.postMessage({ text: pageText, pageNumber: i });
		}
	}

	constructor() {
		super();
		this.state = {
			synth: window.speechSynthesis,
			fileName: localStorage.getItem('fileName'),
			playing: false,
			myWorker: null
		};
	}

	componentDidMount() {
		if (!localStorage.getItem('fileData')) route('/');

		// get base64 data from localstorage and convert to uint8array
		const base64fileData = localStorage.getItem('fileData');
		const binaryData = this.convertDataURIToBinary(base64fileData);

		this.readPDF(binaryData);
	}

	componentWillUnmount() {
		this.state.myWorker.terminate();
		this.state.synth.cancel();
		localStorage.removeItem('fileData');
		localStorage.removeItem('fileName');
	}

	render() {
		return (
			<div class={style.main}>
				<Header title={this.state.fileName} />
				<div id={style.smoke}>
					<span class={style.s0} />
					<span class={style.s1} />
					<span class={style.s2} />
					<span class={style.s3} />
					<span class={style.s4} />
					<span class={style.s5} />
					<span class={style.s6} />
					<span class={style.s7} />
					<span class={style.s8} />
					<span class={style.s9} />
				</div>
				<div class={style.footer}>
					<button class={style.btn} onClick={this.playSpeech}>Play</button>
					<button class={style.btn} onClick={this.pauseSpeech}>Pause</button>
					<button class={style.btn} onClick={this.stopSpeech}>Stop</button>
				</div>
			</div>
		);
	}

}
