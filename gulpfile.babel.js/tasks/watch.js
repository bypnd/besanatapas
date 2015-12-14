import gulp from 'gulp'
import { styles, markup } from '../config'

gulp.task('watch', ['serve'], function() {
  gulp.watch(styles.src,   ['styles'])
  gulp.watch(markup.src, ['markup'])
})
