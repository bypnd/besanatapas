import gulp from 'gulp';
import { reload } from '../lib';
import { markup as config } from '../config';

gulp.task('markup', function() {
  // HTML
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
