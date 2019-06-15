import { h, Component } from 'preact';
import worker from './worker';
import style from './style';

export default class Home extends Component {

	componentDidMount() {
		const myWorker = new Worker(worker);
		
		myWorker.onmessage = (e) => {
			const synth = window.speechSynthesis;
			const sayThis = new SpeechSynthesisUtterance(e.data);
			synth.speak(sayThis);
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
				<a href="../../../node_modules/pdfjs-dist/build/pdf.worker.js">lol</a>
			</div>
		);
	}

}
