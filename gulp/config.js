import bourbon from 'bourbon';

const DEST = './build';
const SRC = './src';

export default {
  assets: {
    images: {
      src: SRC + '/assets/images/*.{svg,png,jpg,gif}',
      dest: DEST + '/images'
    }
  },
  browserify: {
    src: SRC + '/scripts/index.js',  // Only need initial file, browserify finds the deps
    outputName: 'index.js',
    dest: DEST + '/scripts'
  },
  lint: {
    src: [ SRC + '/scripts/**/*', './gulp/**/*.js' ]
  },
  markup: {
    src: SRC + '/*.html',
    dest: DEST
  },
  serve: {
    server: { baseDir: DEST },
    notify: false
  },
  styles: {
    src: SRC + '/styles/**/*.{sass,scss}',
    dest: DEST + '/styles',
    settings: {
      includePaths: [
        'node_modules/normalize.css/',
        bourbon.includePaths[0],
        'node_modules/font-awesome/scss/'
      ]
    }
  }
};
