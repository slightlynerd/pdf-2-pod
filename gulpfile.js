const gulp = require('gulp');

gulp.task('default', (done) => {
	gulp.src(['src/pdf.js', 'src/pdf.worker.js'])
		.pipe(gulp.dest('build'));
	done();
});