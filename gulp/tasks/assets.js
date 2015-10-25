import gulp from 'gulp';
import { plugins, reload } from '../lib';
import { assets as config } from '../config';

gulp.task('assets', function() {
  // copy images
  return gulp.src(config.images.src)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(config.images.dest))
    .pipe(reload({stream: true}));
});
