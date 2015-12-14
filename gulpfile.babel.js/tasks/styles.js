import gulp from 'gulp'
import { plugins, reload, handleErrors } from '../lib'
import { styles as config } from '../config'

gulp.task('styles', function () {
  // styles: sass to css
  gulp.src(config.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(config.settings))
    .on('error', handleErrors)
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}))
})
