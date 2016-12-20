'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var gghp = require('gulp-gh-pages');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var pack = require('../package.json')
var $ = require('gulp-load-plugins')();

function truffleSync() {

  gulp.src("truffle/build/*")
    .pipe(gulp.dest('dist/assets/truffle'));

  return gulp.src("truffle/build/*")
    .pipe(gulp.dest('src/assets/truffle'));


}


gulp.task('truffle-sync', truffleSync);
