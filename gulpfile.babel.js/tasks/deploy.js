import gulp from 'gulp'
import { plugins } from '../lib'

import { deploy as config } from '../config'

gulp.task('deploy', [], function () {
  return plugins.surge({
    project: config.dest,
    domain: config.domain
  })
})
