// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    minify_css = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    notify = require("gulp-notify"),
    prefix = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    jshint = require("gulp-jshint"),
    pngquant = require("imagemin-pngquant"),
    inlineCss = require("gulp-inline-css");

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function(err) {
    console.log(err);
    this.emit('end');
};

gulp.task('main-page', function() {
    return gulp.src('./src/*.html') 
        .pipe(inlineCss())
        .pipe(gulp.dest('./build'));
});

gulp.task('main-page-img', function() {

    return gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/img'));

});

gulp.task('main-page-js', function() {

    return gulp.src('./src/js/*')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'));

});

gulp.task('pizza-page-css', function() {
    return gulp.src('./src/views/css/*.css')
        .pipe(minify_css())
        .pipe(gulp.dest('./build/views/css'));
});

gulp.task('pizza-page-js', function() {

    return gulp.src('./src/views/js/*')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/views/js'));

});