import bourbon from 'bourbon';

const DEST = "./build";
const SRC = './src';

export default {
  serve: {
    server: { baseDir: DEST },
    notify: false
  },
  markup: {
    src: SRC + '/*.html',
    dest: DEST
  },
  assets: {
    images: {
      src: SRC + '/assets/images/*.{svg,png,jpg,gif}',
      dest: DEST + '/images'
    }
  },
  styles: {
    src: SRC + "/styles/**/*.{sass,scss}",
    dest: DEST + '/styles',
    settings: {
      includePaths: [
        'node_modules/normalize.css/',
        bourbon.includePaths[0],
        'node_modules/bourbon-neat/app/assets/stylesheets/'
      ]
    }
  },
  browserify: {
    src: SRC + '/scripts/index.js',  // Only need initial file, browserify finds the deps
    outputName: 'index.js',
    dest: DEST + '/scripts'
  }
}
