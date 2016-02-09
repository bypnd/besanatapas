import gulp from 'gulp'
import fs from 'fs'

import { config } from '../config'

const tmpl = `/* eslint-disable quotes */
export default ${JSON.stringify(config.data)}
/* eslint-enable quotes */`

gulp.task('config', function() {
  return fs.writeFileSync('./src/scripts/config.js', tmpl)
})
