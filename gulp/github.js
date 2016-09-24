'use strict';

var gulp    = require('gulp');
var wiredep = require('wiredep').stream;
var gghp    = require('gulp-gh-pages');
var debug   = require('gulp-debug');
var rename  = require('gulp-rename');
var pack    = require('../package.json')
var $       = require('gulp-load-plugins')();

function ghPrep () {
  return gulp.src("./dist/index.html")
    .pipe( rename('404.html') )
    .pipe( gulp.dest('./dist') );
}

function ghDeploy () {
  return gulp.src('./dist/**/*')

    .pipe( debug() )
    .pipe( gghp({
      branch:  'gh-pages',
      message: "v" + pack.version
    })  );

}

gulp.task('gh-prep', ghPrep);
gulp.task('gh-deploy', ['gh-prep'], ghDeploy);
