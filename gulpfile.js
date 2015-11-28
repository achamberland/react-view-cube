'use strict';

// First time setup- Run:
//   npm install --save-dev gulp vinyl-source-stream vinyl-buffer browserify gulp-concat gulp-sourcemaps gulp-uglify gulp-babel babel-preset-react babel-preset-es2015 gulp-sass gulp-minify-css gulp-util gulp-changed 


//Config - Filepaths

var JS_SRC   = 'src/main.js';
var JS_DEST  = 'build';

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

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var gutil = require('gulp-util');
var changed = require('gulp-changed');


//Tasks

gulp.task('bundleJS', function() {
  return gulp.src(JS_SRC)
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(buffer())

    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file

      .pipe(babel({
            presets: ['react', 'es2015']
        }))
      .pipe(concat('main.js'))
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

gulp.task('browserify', ['bundleJS'], function() {
  var bundleStream = browserify( JS_DEST + '/bundle.js').bundle()
 
  bundleStream
    .pipe(source(JS_DEST + '/main.js'))
    .pipe(gulp.dest('./'))
})


gulp.task('default', ['bundleJS', 'browserify', 'bundleSASS'], function() {

  gulp.watch( JS_SRC,   ['bundleJS',  'browserify'] );
  gulp.watch( SASS_SRC, ['bundleSASS'] );

});