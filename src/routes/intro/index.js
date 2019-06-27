import { h, Component } from 'preact';
import { Link, route } from 'preact-router';
import style from './style';

export default class Intro extends Component {
	// create base64 array and store in localstorage
	createBase64(file) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.addEventListener('load', (e) => {
			const base64FileData = fileReader.result;
			localStorage.setItem('fileData', base64FileData);
			localStorage.setItem('fileName', file.name);
			route('/podcast');
		});
	}

	// select file from device
	handleSelect = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.addEventListener('change', (e) => {
			this.createBase64(e.target.files[0]);
		});
		input.click();
	}

	// handle file drop event
	handleDrop = (e) => {
		e.preventDefault();
		this.createBase64(e.dataTransfer.files[0]);
	};

	allowDrop = (e) => {
		e.preventDefault();
	};

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={style.main} onDrop={this.handleDrop} onDragOver={this.allowDrop}>
				<div class={style.row}>
					<div class={style.column}>

						<div class={style.circle}>
							<img src="../../assets/icons/favicon-32x32.png" width="64" height="64" />
						</div>

						<h2>Drag and Drop or <span class={style.file} onClick={this.handleSelect}>Select a pdf</span></h2>

					</div>
				</div>
				<div class={style.footer}>
					<p><Link class={style.link} href="">View the code</Link> | <Link class={style.link} href="">Report bug</Link></p>
				</div>
			</div>
		);
	}
}
