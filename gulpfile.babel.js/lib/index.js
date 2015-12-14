import gulpLoadPlugins from 'gulp-load-plugins'

export const plugins = gulpLoadPlugins()
export { reload } from 'browser-sync'
export { handleErrors } from './handleErrors.js'
