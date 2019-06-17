import { h, Component } from 'preact';
import style from './style';

export default class Profile extends Component {
	state = {
		time: Date.now(),
		count: 10
	};

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

	// update the current time
	handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		const fileReader = new FileReader();
		fileReader.addEventListener('load', () => {
			console.log(this.convertDataURIToBinary(fileReader.result));
			const pdfjsLib = window['pdfjs-dist/build/pdf'];
			let loadingTask = pdfjsLib.getDocument(this.convertDataURIToBinary(fileReader.result));
			loadingTask.promise.then((doc) => {
				console.log(`Number of pages: ${doc.numPages}`);
				doc.getPage(1).then((page) => {
					page.getTextContent().then((text) => {
						// myWorker.postMessage(text);
					});
				});
			});
		});
		fileReader.readAsDataURL(file);
	};

	allowDrop = (e) => {
		e.preventDefault();
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={style.profile} onDrop={this.handleDrop} onDragOver={this.allowDrop}>
				<h2>Drag and Drop or select a pdf</h2>
			</div>
		);
	}
}
