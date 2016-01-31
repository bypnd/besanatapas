import https from 'https'
import querystring from 'querystring'

import gulpLoadPlugins from 'gulp-load-plugins'

export const plugins = gulpLoadPlugins()
export { reload } from 'browser-sync'
export { handleErrors } from './handleErrors.js'

export function rollbarRecordDeploy(options, done = () => {}) {
  plugins.util.log('Starting '
    + plugins.util.colors.yellow(`[${options.revision}] `)
    + plugins.util.colors.cyan(`record deployment to rollbar`)
    + '...'
  )
  let postData = querystring.stringify({
    'access_token': options.logger.apiToken,
    'environment': options.env,
    'revision': options.revision,
    'local_username': options.username
  })
  let req = https.request({
    hostname: 'api.rollbar.com',
    port: 443,
    path: '/api/1/deploy/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }, (res) => {
    res.on('data', (data) => {
      plugins.util.log('Response from '
        + plugins.util.colors.cyan('record deployment to rollbar')
        + ': '
        + plugins.util.colors.yellow(data)
      )
    })
    res.on('end', () => {
      plugins.util.log('Finished '
        + plugins.util.colors.cyan('record deployment to rollbar') + '.'
      )
      done()
    })
  })
  req.write(postData)
  req.end()
  req.on('error', (e) => {
    plugins.util.log(plugins.util.colors.red('ERROR ' + e))
  })
  return req
}
