import gulp from 'gulp'
import mergeStream from 'merge-stream'
import { plugins, reload } from '../lib'
import { assets as config } from '../config'

gulp.task('favicon', function(done) {
  // generate favicons
  plugins.realFavicon.generateFavicon(config.favicon, () => done())
})

gulp.task('assets', ['favicon'], function() {
  // copy images
  let imagesStream = gulp.src(config.images.src)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(config.images.dest))
    .pipe(reload({stream: true}))
  // copy third party scripts
  let libStream = gulp.src(config.lib.src)
    .pipe(gulp.dest(config.lib.dest))
  return mergeStream(imagesStream, libStream)
})
