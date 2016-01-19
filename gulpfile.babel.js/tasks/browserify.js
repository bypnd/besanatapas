import babelify from 'babelify'
import browserify from 'browserify'
import gulp from 'gulp'
import lazypipe from 'lazypipe'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import watchify from 'watchify'
import { browserify as config } from '../config'
import { handleErrors, plugins, reload } from '../lib'

let uglify = lazypipe()
  .pipe(buffer)
  .pipe(plugins.sourcemaps.init, { loadMaps: true })
  .pipe(plugins.uglify)
  .pipe(plugins.sourcemaps.write, './')

// babelify+watchify+browserify
let b = browserify({
  cache: {},
  debug: true,
  entries: [config.src],
  extensions: ['.jsx'],
  packageCache: {},
  transform: [babelify]
})
let bundler = function () {
  let bundleStart = Date.now()
  plugins.util.log('Browserify bundler started')
  return b
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.outputName))
    .pipe(!config.watch ? uglify() : plugins.util.noop())
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
