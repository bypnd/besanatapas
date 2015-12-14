import gulp from 'gulp'
import { plugins, reload } from '../lib'
import { markup as config } from '../config'

gulp.task('markup', function() {
  // HTML
  return gulp.src(config.src)
    .pipe(plugins.template(config.data))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}))
})
