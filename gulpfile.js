const {watch, parallel, series} = require('gulp');


const browserSync = require('browser-sync').create();


const html = require('./task/html.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const clean = require('./task/clean.js');
const img = require('./task/img.js');
const font = require('./task/font.js');

const path = require("./config/path.js");
const app = require('./config/app.js');

const watcher = () => {
  watch(path.scss.watch, scss).on('change', browserSync.reload);
  watch(path.js.watch, js).on('change', browserSync.reload);
  watch(path.html.watch, html).on('change', browserSync.reload);
  watch(path.img.watch, img).on('change', browserSync.reload);
  watch(path.font.watch, font).on('change', browserSync.reload);
}

const server = () => {
  browserSync.init({
    server:{
      baseDir: path.root
    }
  });
}

const build = series(
  clean,
  parallel(html, scss, js, img, font)
)

const dev = series(
  build, 
  parallel(server, watcher)
)

exports.default = app.isProd ? build : dev;