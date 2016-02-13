import assign from 'deep-assign'
import bourbon from 'bourbon'
import fs from 'fs'
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

// write config as ES6 module to be imported by the JS app
fs.writeFileSync(
`${SRC}/scripts/config.js`,
`/* eslint-disable quotes */
export default ${JSON.stringify(baseConfig)}
/* eslint-enable quotes */`
)

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
export const deploy = {
  data: baseConfig,
  dest: DEST,
  domain: baseConfig.domain
}
export const lint = {
  src: [ SRC + '/scripts/**/*', './gulpfile.babel.js/**/*.js' ]
}
const MARKUPDIR = '/templates'
export const markup = {
  data: baseConfig,
  dest: DEST,
  faviconData: FAVICON_DATA,
  layouts: `${SRC}${MARKUPDIR}/layouts/*.hbs`,
  options: { layout: `${SRC}${MARKUPDIR}/layouts/base.hbs` },
  pages: `${SRC}${MARKUPDIR}/pages/*.hbs`,
  partials: `${SRC}${MARKUPDIR}/partials/*.hbs`,
  src: `${SRC}${MARKUPDIR}/**/*.hbs`
}
export const serve = {
  server: { baseDir: DEST },
  notify: false
}
export const styles = {
  src: SRC + `/styles/${baseConfig.site}.scss`,
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
