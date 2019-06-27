const workercode = () => {

	self.onmessage = function(e) {
		const rawContent = e.data.text.items;
		let filteredContent = '';
		rawContent.map((item) => {
			filteredContent += item.str;
		});
		self.postMessage({ text: filteredContent, pageNumber: e.data.pageNumber });
	};
};

let code = workercode.toString();
code = code.substring(code.indexOf('{')+1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker = URL.createObjectURL(blob);

export default worker;