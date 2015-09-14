import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import { plugins, reload } from '../lib';
import { browserify as config } from '../config';

gulp.task('browserify', function() {
  // babelify+watchify+browserify

  var bundler = browserify({
    entries: [config.src],
    transform: [babelify],
    debug: true, cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher
    .on('update', function () { // When any files updates
      var updateStart = Date.now();
      plugins.util.log('Updating!');
      watcher.bundle()
      .pipe(source(config.outputName))
      // This is where you add uglifying etc.
      .pipe(gulp.dest('./build/scripts/'))
      .pipe(reload({stream: true}));
      plugins.util.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source(config.outputName))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
