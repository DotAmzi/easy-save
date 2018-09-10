const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const DEST = './lib/';

gulp.task('clear', () => {
  return gulp.src('lib/', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clear'], () =>
  gulp.src(['src/save-file.js'])
    .pipe(babel({
      presets: ['es2015'],
      compact: false
    }))
    .pipe(gulp.dest(DEST))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST))
);

gulp.task('watch', ['build'], () => {
  return gulp.watch(['src/**/*.js', 'test/**/*.js', 'src/**/*.json'], ['build']);
});

gulp.task('default', ['watch']);