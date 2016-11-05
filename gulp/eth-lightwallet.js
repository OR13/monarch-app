'use strict';

var gulp    = require('gulp');
var wiredep = require('wiredep').stream;
var gghp    = require('gulp-gh-pages');
var debug   = require('gulp-debug');
var rename  = require('gulp-rename');
var pack    = require('../package.json')
var $       = require('gulp-load-plugins')();

function installEthLightWallet () {

  return gulp.src("node_modules/eth-lightwallet/dist/*")
    .pipe( gulp.dest('src/assets/eth-lightwallet') );
}


gulp.task('install-eth-lightwallet', installEthLightWallet);
