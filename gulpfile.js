'use strict';

// First time setup- Run:
//   npm install --save-dev gulp vinyl-source-stream vinyl-buffer browserify gulp-concat gulp-sourcemaps gulp-uglify gulp-babel babel-preset-react babel-preset-es2015 gulp-sass gulp-minify-css gulp-util gulp-changed 


//Config - Filepaths

var JSX_SRC     = 'src/jsx/main.jsx';
var JSX_SRC_DIR = 'src/jsx/**/*';
var JS_DEST     = 'build/js';

var SASS_SRC = 'src/sass/app.scss';
var CSS_DEST = 'build/css';

//Support adding custom Dependencies to pipe- one for streams one for normal pipes, css + js




//Dependencies

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var babelify = require("babelify");

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var gutil = require('gulp-util');
var changed = require('gulp-changed');


//Tasks

gulp.task('bundleJS', function() {
  
  return browserify( {entries: JSX_SRC, extensions: ['.jsx'], debug:true} )
    .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()

    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file

    .pipe(gulp.dest(JS_DEST))
});

gulp.task('bundleSASS', function(){
  return gulp.src(SASS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())

    .pipe(gulp.dest(CSS_DEST))
});


gulp.task('default', ['bundleJS', 'bundleSASS'], function() {

  gulp.watch( JSX_SRC_DIR, ['bundleJS'] );
  gulp.watch( SASS_SRC,    ['bundleSASS'] );

});