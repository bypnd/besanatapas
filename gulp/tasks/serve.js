import gulp from 'gulp';
import browserSync from 'browser-sync';

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/styles/*.scss', ['styles']);
});
