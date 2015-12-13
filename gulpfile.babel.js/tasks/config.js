import gulp from 'gulp';
import { plugins, reload } from '../lib';

import { config } from '../config';

gulp.task('config', function() {
  // copy the right config file into scripts folder
  return gulp.src(config.src)
    .pipe(plugins.template({config: JSON.stringify(config.data)}))
    .pipe(plugins.rename('config.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}));
});
