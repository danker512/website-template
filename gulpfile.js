var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var ejs = require('gulp-ejs');
var fs = require('fs');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var browser = require('browser-sync');
var del = require('del');
var watch = require('gulp-watch');


var path = {
    dev: './dev',
    public: './public'
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
gulp.task('watch', ['ts:dev', 'sass:dev'], function() {
    browser.init({
        server: './public'
    });
    watch(path.dev + '/ts/**/*.ts', ['ts:dev']);
    watch(path.dev + '/sass/**/*.scss', ['sass:dev']);
    watch([
            path.public + '/css/**/*.css',
            path.public + '/**/*.html',
            path.public + 'js/**/*.js'
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
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.public + '/css'));
});

gulp.task('sass:public', function() {
    return gulp.src(path.dev + '/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.public + '/css'));
});

gulp.task('pleeease', function() {
    gulp.src(path.public + '/css/**/*.css')
        .pipe(pleeease({
            autoprefixer: {
                browser: ['last 3 versions', 'Android 4.2']
            },
            minifier: true
        }))
        .pipe(gulp.dest(path.public + '/css'));
});

gulp.task('css:dev', function(callback) {
    return runSequence('sass:dev', 'pleeease', callback);
});

gulp.task('css:public', function(callback) {
    return runSequence('sass:public', 'pleeease', callback);
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
        .pipe(ejs({}, {
            ext: '.html'
        }))
        .pipe(gulp.dest(path.public))
});

/**
 * TypeScript
 * tslint
 * ts
 */
gulp.task('tslint', function() {
    return gulp.src([
            path.dev + '/**/*.ts',
            '!./typings/**/*.d.ts'
        ])
        .pipe(tslint({
            configuration: './tslint.json'
        }))
        .pipe(tslint.report('verpose'));
});

gulp.task('ts:dev', function(callback) {
    return runSequence('tslint', 'browserify:dev', callback);
});

gulp.task('ts:public', function(callback) {
    return runSequence('tslint', 'browserify:public', callback);
});

/**
 * Browserify
 */

function execBrowserify(isDevelop) {
    var bundle = browserify({
        entries: path.dev + '/ts/main.ts',
        debug: isDevelop
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer());

    if(isDevelop) {
        return bundle
            .pipe(sourcemaps.init({loadMaps: true}))
            // .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.public + '/js'));
    } else {
        return bundle
            .pipe(uglify())
            .pipe(gulp.dest(path.public + '/js'));
    }
}

gulp.task('browserify:dev', function() {
    return execBrowserify(true);
});

gulp.task('browserify:public', function() {
    return execBrowserify();
});

/**
 * メイン
 */
gulp.task('dev', function() {
    return runSequence('clean:dev', 'css:dev', 'ts:dev');
});
gulp.task('public', function() {
    return runSequence('clean:public', 'css:public', 'ts:public');
});
