const workercode = () => {

	self.onmessage = function(e) {
		const rawContent = e.data.items;
		let filteredContent = '';
		rawContent.map((item) => {
			if (item.str === '') {
				return;
      }
      else {
        filteredContent += item.str;
      }
		});
		self.postMessage(filteredContent);
	};
};

let code = workercode.toString();
code = code.substring(code.indexOf('{')+1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker = URL.createObjectURL(blob);

export default worker;