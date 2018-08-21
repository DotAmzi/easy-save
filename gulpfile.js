const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
var fs = require('fs');

gulp.task('clear', () => {
  return gulp.src('lib/', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clear'], () =>
  gulp.src(['src/**/*.js'])
    .pipe(babel({
      presets: ['es2015'],
      compact: false
    }))
    .pipe(gulp.dest('lib'))
);

gulp.task('watch', ['build'], () => {
  return gulp.watch(['src/**/*.js', 'test/**/*.js', 'src/**/*.json'], ['build']);
});

gulp.task('default', ['watch']);