/*global Rollbar*/
import config from '../config'

/** log levels:
 *  5 error
 *  4 warn
 *  3 info
 *  2 log
 *  1 debug (alias for log but with lower level)
 *  1 trace
 *  0 no logs
 */
const _LEVELS = {
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  debug: 1,
  trace: 1
}

let _history = []
let _level = config.logger.level || 0

function _devToolsConsole(level) {
  const args = Array.prototype.slice.call(arguments)
  args.shift()
  // check if console[level] is a method of object console <- To be ignored by IE9 and lower
  if (typeof console === 'object' && console[level] && console[level].apply) { //eslint-disable-line no-console
    console[level].apply(console, args) //eslint-disable-line no-console
  }
}
function _logWriter(level) {
  const args = Array.prototype.slice.call(arguments)
  _history.push(args)
  if (config.debug) {
    _devToolsConsole.apply(this, args)
  } else if (config.logger && Rollbar) {
    args.shift()
    // Rollbar doesn't have `log` level, we change to `debug`
    level = (level === 'log') ? 'debug' : level
    Rollbar[level].apply(Rollbar, args)
  }
}

function Logger() { /* constructor */ }

Logger.prototype.log = function () {
  if (_level <= _LEVELS.log) {
    const args = Array.prototype.slice.call(arguments)
    args.unshift('log')
    _logWriter.apply(this, args)
  }
}
Logger.prototype.debug = function () {
  if (_level <= _LEVELS.debug) {
    const args = Array.prototype.slice.call(arguments)
    args.unshift('log')
    _logWriter.apply(this, args)
  }
}
Logger.prototype.info = function () {
  if (_level <= _LEVELS.info) {
    const args = Array.prototype.slice.call(arguments)
    args.unshift('info')
    _logWriter.apply(this, args)
  }
}
Logger.prototype.error = function () {
  if (_level <= _LEVELS.error) {
    const args = Array.prototype.slice.call(arguments)
    args.unshift('error')
    _logWriter.apply(this, args)
  }
}

export default new Logger()
