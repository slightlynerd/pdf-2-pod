export default config => {
	config.module.noParse = /pdfjs-dist|pdfjs-dist\/build\/pdf.worker.js/;
};