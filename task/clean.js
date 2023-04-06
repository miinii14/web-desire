const {src} = require('gulp');

const clean = require('gulp-clean');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const path = require("../config/path.js")


const cleanDist = () => {
  return src(path.root, { read: false, allowEmpty: true })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "cleanDist",
        message: error.message
      }))
    }))
    .pipe(clean())
}

module.exports = cleanDist;