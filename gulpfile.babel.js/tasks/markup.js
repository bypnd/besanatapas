import fs from 'fs'
import gulp from 'gulp'
import { plugins, reload } from '../lib'
import { markup as config } from '../config'

gulp.task('markup', ['assets'], function() {
  // HTML
  return gulp.src(config.src)
    .pipe(plugins.template(config.data))
    .pipe(plugins.realFavicon.injectFaviconMarkups(
      JSON.parse(
        fs.readFileSync(config.faviconData)
      ).favicon.html_code))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}))
})
