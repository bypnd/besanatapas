import gulp from 'gulp'
import { plugins } from '../lib'
import { lint as config } from '../config'

gulp.task('lint', function () {
  return gulp.src(config.src)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
})
