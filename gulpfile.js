// Required Modules
var gulp = require('gulp');
// Loads gulp plugins from the list in the package.json file.
var $ = require('gulp-load-plugins')();

var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');

// The port the server starts on.
var port = process.env.PORT || 8000;
// Browsers to use autoprefixer for:
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
// File path shortcuts.
var build = './build/';
var src = './src/';

// ------ GULP TASKS

// Running 'gulp' or 'gulp help' writes out all the tasks that we've defined to the console.
gulp.task('help', $.taskListing);
// Make help the default task.
gulp.task('default', ['help']);

// --- Build folder cleaning tasks

gulp.task('clean-html', function(done) {
  clean(build + '**/*.html', done);
});

gulp.task('clean-css', function(done) {
  clean(build + '**/*.css', done);
});

gulp.task('clean-js', function(done) {
  clean(build + '**/*.js', done);
});

gulp.task('clean-images', function(done) {
  var imageFiles = [].concat(build + 'img/*.*', build + 'views/images/*.*');
  clean(imageFiles, done);
});

// --- File processing

// Process HTML.
gulp.task('html', ['clean-html'], function() {
  return gulp
    .src('./src/**/*.html', {base: 'src'})
    .pipe($.inlineSource())
    .pipe($.minifyHtml())
    .pipe(gulp.dest(build));
});

// Process CSS.
gulp.task('css', ['clean-css'], function() {
  return gulp
    .src('./src/**/*.css', {base: 'src'})
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.csso())
    .pipe(gulp.dest(build));
});

// Process JS.
gulp.task('js', ['clean-js'], function() {
  return gulp
    .src('./src/**/*.js', {base: 'src'})
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(build));
});

// Process images.
gulp.task('images', ['clean-images'], function() {
  return gulp
    .src([].concat(src + 'img/*.*', src + 'views/images/*.*'), {base: 'src'})
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 4
    }))
    .pipe(gulp.dest(build));
});

gulp.task('build', ['jshint', 'html', 'css', 'js', 'images'], function() {
  log('Making a clean build.');
});

// --- Nodemon

// Task for linting the Javascript before we start the server.
gulp.task('jshint', function() {
  return gulp
    .src([].concat(src + '**/*.js','./gulpfile.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

// When calling 'gulp serve-dev', 'jshint' is run as a dependency and ./server/app.js is started, listening on the default port. If there are any changes to the ./server/ directory, nodemon restarts the server after a delay of a second.
gulp.task('serve', ['jshint', 'build'], function() {
  var isDev = false;

  // Nodemon options:
  var nodeOptions = {
    script: './server/app.js',
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: ['./server/']
  };

  // Start nodemon with our predefined options.
  return $.nodemon(nodeOptions)
    .on('restart', function(ev) {
      log('Nodemon restarted.');
      log('Files changed on restart:\n' + ev + '.');
      // Give the server a chance to restart and then reload browserSync.
      setTimeout(function() {
        browserSync.notify('Reloading now...');
        browserSync.reload({stream: false});
      }, 1000);
    })
    .on('start', function() {
      log('Nodemon started.');
      // Start browserSync when we launch nodemon.
      startBrowserSync();
    })
    .on('crash', function() {
      log('Nodemon crashed.');
    })
    .on('exit', function() {
      log('Nodemon exited.');
    });
});

// ------ HELPER FUNC

// Kicks off browserSync when nodemon starts up.
function startBrowserSync() {
  // If you use the argument '--nosync', or browserSync is already active, this shouldn't do anything.
  if (args.nosync || browserSync.active) {
    return;
  }
  // Options for browserSync.
  var options = {
    proxy: 'localhost:' + port,
    port: 3000,
    files: [src + '**/*.*'],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0 // 1000
  };
  // Start browserSync.
  browserSync(options);
}

// Function to clean temporary files.
function clean(path, done) {
  log('Cleaning ' + path);
  del(path, done);
}

// Function to log messages with some color.
function log(msg) {
  $.util.log($.util.colors.blue(msg));
}