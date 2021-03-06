import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './style';

export default class Intro extends Component {
	state = {
		itemDragged: null
	};
	// create base64 array and store in localstorage
	createBase64(file) {
		if (file.type !== 'application/pdf') {
			// eslint-disable-next-line no-alert
			alert('Please select a pdf file');
			return;
		}
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
		this.setState({ itemDragged: null });
	};

	allowDrop = (e) => {
		e.preventDefault();
		this.setState({ itemDragged: 'dragged' });
	};

	cancelDrag = (e) => {
		e.preventDefault();
		this.setState({ itemDragged: null });
	};

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={`${style.main} ${this.state.itemDragged ? style.dragged : style.undragged}`} onDrop={this.handleDrop} onDragOver={this.allowDrop} onDragExit={this.cancelDrag} onDragLeave={this.cancelDrag}>
				<div class={style.row}>
					<div class={style.column}>

						<div class={style.circle}>
							<img src="../../assets/logo-81x81.png" />
						</div>

						<h2 class={style.heading}>Drag and Drop or <span class={style.file} onClick={this.handleSelect}>Select a pdf</span></h2>

					</div>
				</div>
				<div class={style.footer}>
					<p><a class={style.link} href="https://github.com/slightlynerd/pdf-2-pod">View the code</a> | <a class={style.link} href="https://github.com/slightlynerd/pdf-2-pod/issues">Report bug</a></p>
				</div>
			</div>
		);
	}
}
