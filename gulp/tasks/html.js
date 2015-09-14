import gulp from 'gulp';
import { reload } from '../lib';

gulp.task('html', function() {
  // HTML
  return gulp.src('src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});
