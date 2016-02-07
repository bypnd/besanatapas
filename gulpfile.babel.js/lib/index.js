import fs from 'fs'
import https from 'https'
import querystring from 'querystring'

import gulpLoadPlugins from 'gulp-load-plugins'

export const plugins = gulpLoadPlugins()
export { reload } from 'browser-sync'
export { handleErrors } from './handleErrors.js'

/**
 * Given the path to a valid JSON file returns a JSON object
 *
 * @param String filepath
 *
 * @return Object JSON
 */
export function loadJSON(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'))
  } catch (err) {
    plugins.util.log(
      plugins.util.colors.yellow('WARNNING!! Unable to load JSON file: '),
      plugins.util.colors.red(err.message)
    )
    return {}
  }
}
/**
 * Record the deploy into the logger (rollbar)
 *
 * @param Object options
 * @param Function done (callback)
 *
 * @return Object (request)
 */
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
    'local_username': options.logger.username
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
