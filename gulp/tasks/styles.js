import gulp from 'gulp';
import { plugins, reload } from '../lib';

gulp.task('styles', function () {
  // styles: sass to css
  gulp.src('./src/styles/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./build/styles'))
    .pipe(reload({stream: true}));
});
