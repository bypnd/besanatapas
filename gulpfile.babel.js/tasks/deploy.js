import gulp from 'gulp'
import { plugins, rollbarRecordDeploy } from '../lib'

import { deploy as config } from '../config'

gulp.task('deploy', ['build'], function (done) {
  //TODO surge plugin simply run the surge CLI in a child process
  // [Child Process Node.js v4.2.6 Manual & Documentation](https://nodejs.org/dist/latest-v4.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options)
  plugins.surge({
    project: config.dest,
    domain: config.domain
  }).on('close', (stdout) => {
    plugins.util.log(`Finished deployment to surge (${stdout})`)
    rollbarRecordDeploy(config.data, done)
  })
})
