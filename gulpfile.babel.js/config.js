import assign from 'deep-assign'
import bourbon from 'bourbon'
import git from 'git-rev-sync'
import minimist from 'minimist'
import { loadJSON } from './lib'

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
assign(
  baseConfig,
  {
    debug: (options.env === 'development'),
    env: options.env,
    revision: process.env.GIT_COMMIT || git.short(), //eslint-disable-line no-undef
    site: options.site,
    version: pkg.version
  },
  envConfig
)

const DEST = `./build/${baseConfig.site}`
const SRC = './src'
const FAVICON_DATA = '.favicondata'

export const assets = {
  favicon: {
    masterPicture: SRC + '/assets/favicon.png',
    dest: DEST,
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '28%',
        appName: 'Besana Tapas'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        appName: 'Besana Tapas'
      },
      androidChrome: {
        pictureAspect: 'backgroundAndMargin',
        margin: '25%',
        backgroundColor: '#ffffff',
        themeColor: '#a8acb8',
        manifest: {
          name: 'BesanaTapas',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    versioning: {
      paramName: 'rev',
      paramValue: baseConfig.revision
    },
    markupFile: FAVICON_DATA
  },
  images: {
    src: SRC + '/assets/images/*.{svg,png,jpg,gif}',
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
