import assign from 'deep-assign'
import bourbon from 'bourbon'
import git from 'git-rev-sync'
import minimist from 'minimist'
import { loadJSON, pageTitle } from './lib'

let knownOptions = {
  string: ['env', 'site'],
  default: {
    env: process.env.NODE_ENV || 'production', //eslint-disable-line no-undef
    site: process.env.SITE || 'default' //eslint-disable-line no-undef
  }
}
let options = minimist(process.argv.slice(2), knownOptions) //eslint-disable-line no-undef
if (process.argv.indexOf('dev') !== -1) options.env = 'development' //eslint-disable-line no-undef

// generate configs: combine base + environment configs
const pkg = loadJSON('./package.json')
const baseConfig = loadJSON('./src/config/config.json')
const envConfig = loadJSON('./src/config/' + options.env + '.json')
const siteConfig = loadJSON('./src/sites/' + options.site + '.json')
assign(
  baseConfig,
  {
    debug: (options.env === 'development'),
    env: options.env,
    revision: process.env.GIT_COMMIT || git.short(), //eslint-disable-line no-undef
    site: options.site,
    version: pkg.version
  },
  siteConfig,
  envConfig,
  {
    title: pageTitle(siteConfig.title, envConfig.titlePrefix)
  }
)

const DEST = `./build/${baseConfig.site}`
const SRC = './src'
const FAVICON_DATA = '.favicondata'

export const assets = {
  favicon: {
    dest: DEST,
    design: baseConfig.favicon,
    iconsPath: '/',
    markupFile: FAVICON_DATA,
    masterPicture: SRC + `/assets/${baseConfig.site}/favicon.png`,
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    versioning: {
      paramName: 'rev',
      paramValue: baseConfig.revision
    }
  },
  images: {
    src: SRC + `/assets/${baseConfig.site}/images/*.{svg,png,jpg,gif}`,
    dest: DEST + '/images'
  },
  lib: {
    src: './node_modules/rollbar-browser/dist/rollbar.min.js',
    dest: DEST + '/scripts'
  }
}
export const browserify = {
  dest: DEST + '/scripts',
  glob: baseConfig,
  outputName: 'app.js',
  src: SRC + '/scripts/app.js',
  watch: (options.env === 'development')
}
export const config = {
  data: baseConfig,
  src: SRC +  '/config/config.tmpl',
  dest: SRC + '/scripts'
}
export const deploy = {
  data: baseConfig,
  dest: DEST,
  domain: baseConfig.domain
}
export const lint = {
  src: [ SRC + '/scripts/**/*', './gulpfile.babel.js/**/*.js' ]
}
export const markup = {
  data: baseConfig,
  dest: DEST,
  faviconData: FAVICON_DATA,
  src: SRC + '/*.html'
}
export const serve = {
  server: { baseDir: DEST },
  notify: false
}
export const styles = {
  src: SRC + '/styles/**/*.{sass,scss}',
  dest: DEST + '/styles',
  settings: {
    includePaths: [
      'node_modules/normalize.css/',
      bourbon.includePaths[0],
      'node_modules/font-awesome/scss/'
    ],
    outputStyle: options.env === 'development' ? 'nested' : 'compressed'
  }
}
