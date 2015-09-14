const DEST = "./build";
const SRC = './src';

export default {
  serve: {
    server: { baseDir: DEST }
  },
  markup: {
    src: SRC + '/*.html',
    dest: DEST
  },
  styles: {
    src: SRC + "/styles/**/*.{sass,scss}",
    dest: DEST + '/styles',
    settings: {}
  },
  browserify: {
    src: SRC + '/scripts/index.js',  // Only need initial file, browserify finds the deps
    outputName: 'index.js',
    dest: DEST + '/scripts'
  }
}
