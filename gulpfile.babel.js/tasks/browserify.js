import babelify from 'babelify'
import browserify from 'browserify'
import gulp from 'gulp'
import source from 'vinyl-source-stream'
import watchify from 'watchify'
import { browserify as config } from '../config'
import { handleErrors, plugins, reload } from '../lib'

// babelify+watchify+browserify
var b = browserify({
  cache: {},
  debug: true,
  entries: [config.src],
  extensions: ['.jsx'],
  packageCache: {},
  transform: [babelify]
})
var bundler = function () {
  var bundleStart = Date.now()
  plugins.util.log('Browserify bundler started')
  return b
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.outputName))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream:true}))
    .pipe(plugins.notify({
      message: '<%= file.relative %> successfuly bundled in <%= options.time %> ms',
      templateOptions: { time: Date.now() - bundleStart }
    }))
}
if (config.watch) {
  b = watchify(b)
  b.on('update', bundler)
  b.on('log', plugins.util.log)
}

gulp.task('browserify', ['config'], function() {
  return bundler()
})
