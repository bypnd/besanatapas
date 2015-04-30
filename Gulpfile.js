'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sourceFile = './src/scripts/index.js';
var destFolder = './build/scripts';
var destFileName = 'index.js';

gulp.task('html', function() {
	// HTML
  return gulp.src('src/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('browserify', function() {
	// reactify+watchify+browserify

  var bundler = browserify({
    entries: ['./src/scripts/index.js'], // Only need initial file, browserify finds the deps
    transform: [reactify], // Convert JSX to normal javascript
    debug: true, cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher  = watchify(bundler);

  return watcher
	  .on('update', function () { // When any files updates
	      var updateStart = Date.now();
				plugins.util.log('Updating!');
	      watcher.bundle()
	      .pipe(source('index.js'))
	      // This is where you add uglifying etc.
	      .pipe(gulp.dest('./build/scripts/'))
				.pipe(reload({stream: true}));
				plugins.util.log('Updated!', (Date.now() - updateStart) + 'ms');
	  })
	  .bundle() // Create the initial bundle when starting the task
	  .pipe(source('index.js'))
	  .pipe(gulp.dest('./build/scripts/'))
		.pipe(reload({stream: true}));
});

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['html', 'browserify', 'serve'], function () {});
