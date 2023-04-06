const {src, dest} = require('gulp');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require('gulp-shorthand');
const mediaQueries = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

const path = require('../config/path.js');
const app = require('../config/app.js');

const scss = () => {
  return src(path.scss.src, {sourcemaps: app.isDev})
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "scss",
        message: error.message
      }))
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer(app.autoprefixer))
    .pipe(shorthand())
    .pipe(mediaQueries())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(app.isProd, csso()))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isDev}))
}

module.exports = scss;