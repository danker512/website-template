// Common
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var fs = require('fs');
var browser = require('browser-sync');
var del = require('del');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');

// Sass
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');

// Image
var imagemin = require('gulp-imagemin');

// EJS
var ejs = require('gulp-ejs');

// HTML
var htmlHint = require('gulp-htmlhint');

// TypeScript
var webpack = require('webpack-stream');

var path = {
  dev: 'dev',
  public: 'public'
};

/**
 * Clean
 */
gulp.task('clean:css', function() {
  return del([path.public + '/css/**/*.css']);
});
gulp.task('clean:cache', function() {
  return del(['./sass-cache']);
});
gulp.task('clean:js', function() {
  return del([path.public + '/js/**/*.js']);
});
gulp.task('clean:map', function() {
  return del([
    path.public + '/js/**/*.js.map',
    path.public + '/css/**/*.css.map'
  ]);
});
gulp.task('clean:dev', function() {
  return runSequence('clean:js', 'clean:css');
});

gulp.task('clean:public', function() {
  return runSequence('clean:dev', 'clean:cache', 'clean:map');
});

/**
 * Watch
 * browser
 */
gulp.task('watch', ['webpack', 'sass:dev'], function() {
  browser.init({
    server: './public'
  });
  watch([path.dev + '/ts/**/*.ts'], function() {
    gulp.start('webpack');
  });
  watch([path.dev + '/sass/**/*.scss'], function() {
    gulp.start('sass:dev');
  });
  watch([path.public + '/**/*.html'], function() {
    gulp.start('html');
  });
  watch([
      path.public + '/css/**/*.css',
      path.public + '/**/*.html',
      path.public + '/js/**/*.js'
    ],
    browser.reload);
});

/**
 * SASS
 * sass:dev
 * sass:public
 * pleeease
 * css:dev
 * css:public
 */
gulp.task('sass:dev', function() {
  return gulp.src(path.dev + '/sass/**/*.scss')
    .pipe(cache('sass'))
    .pipe(progeny())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.public + '/css'));
});

gulp.task('sass:public', function() {
  return gulp.src(path.dev + '/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.public + '/css'));
});

function execPleeease(isDevelop) {
  gulp.src(path.public + '/css/**/*.css')
    .pipe(pleeease({
      autoprefixer: {
        browser: ['ie9', 'Android 4.2']
      },
      minifier: !isDevelop
    }))
    .pipe(gulp.dest(path.public + '/css'));
}

gulp.task('pleeease:dev', function() {
  return execPleeease(true);
});

gulp.task('pleeease:public', function() {
  return execPleeease(false);
});

gulp.task('css:dev', function(callback) {
  return runSequence('sass:dev', 'pleeease:dev', callback);
});

gulp.task('css:public', function(callback) {
  return runSequence('sass:public', 'pleeease:public', callback);
});

/**
 * Minify Images
 * imagemin
 */
gulp.task('imagemin', function() {
  gulp.src(path.public + '/img/**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest(path.public + '/img'));
});

/**
 * Create HTML using EJS
 * ejs
 */
gulp.task('ejs', function() {

  gulp.src([path.dev + '/template/**/*.ejs',
      '!' + path.dev + '/template/**/_*.ejs'
    ])
    .pipe(cache('ejs'))
    .pipe(plumber())
    .pipe(ejs({}, {
      ext: '.html'
    }))
    .pipe(gulp.dest(path.public))
});

/**
 *  Validate HTML
 */
gulp.task('html', function() {
  gulp.src(path.public + '/**/*.html')
    .pipe(cache('html'))
    .pipe(plumber())
    .pipe(htmlHint('./htmlhintrc.json'))
    .pipe(htmlHint.failReporter());
});

/**
 * Webpack
 */
gulp.task('webpack', function() {
  return gulp.src(path.dev + '/ts/main.ts')
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(path.public + '/js'));
});

/**
 * Main
 */
gulp.task('dev', function() {
  return runSequence('clean:dev', 'css:dev', 'webpack');
});
gulp.task('public', function() {
  return runSequence('clean:public', 'css:public', 'webpack');
});
