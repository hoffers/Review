var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function(){
  gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
  gulp.src('src/views/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/views/css'));
});

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  gulp.src('src/views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'));
});

gulp.task('default', function(){
  
});
