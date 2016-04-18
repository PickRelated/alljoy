var gulp = require('gulp')
    sass = require('gulp-sass')
    rename = require('gulp-rename')
    concat = require('gulp-concat-css')
    clean = require('gulp-clean-css')
    jade = require('gulp-jade')
    coffee = require('gulp-coffee')
    concatjs = require('gulp-concat')
    uglify = require('gulp-uglify')
    watch = require('gulp-watch');

var ALL_TASKS = ['css', 'html', 'js']
var ALL_WATCHERS = ['watch:css', 'watch:html', 'watch:js']

gulp.task('css', function() {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(rename(function(path) {
      path.basename = 'styles';
      return path;
    }))
    .pipe(concat('style.css'))
    .pipe(clean())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('.'));
});

gulp.task('html', function() {
  return gulp.src('src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('.'))
})

gulp.task('js', function() {
  return gulp.src('src/coffee/*.coffee')
    .pipe(coffee())
    .pipe(concatjs('script.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('.'))
})

gulp.task('watch:css', function () {
  gulp.watch('src/sass/**/*.sass', ['css']);
});

gulp.task('watch:html', function () {
  gulp.watch('src/jade/*.jade', ['html']);
});

gulp.task('watch:js', function () {
  gulp.watch('src/coffee/*.coffee', ['js']);
});

gulp.task('default', ALL_TASKS);

gulp.task('watch', ALL_WATCHERS);
