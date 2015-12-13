import gulp from 'gulp';
import config from '../config';

gulp.task('watch', ['serve'], function() {
  gulp.watch(config.styles.src,   ['styles']);
  gulp.watch(config.markup.src, ['markup']);
});
