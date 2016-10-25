const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('default', () => {
  gulp.src('src')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
