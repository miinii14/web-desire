const {src, dest} = require('gulp');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const path = require('../config/path.js');
const app = require('../config/app.js');
const gulpif = require('gulp-if');

const js = () => {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    path.js.src,
  ], {sourcemaps: app.isDev})
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "js",
        message: error.message
      }))
    }))
    .pipe(babel())
    .pipe(concat('main.min.js'))
    .pipe(gulpif(app.isProd, uglify()))
    .pipe(dest(path.js.dest, {sourcemaps: app.isDev}))
}

module.exports = js;