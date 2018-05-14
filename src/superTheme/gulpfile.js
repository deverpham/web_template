const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var uglifyjs = require('gulp-uglify-es').default;
const path = require('path');
source_cmd = path.join(__dirname, '');
var pump = require('pump');
cleanCSS = require('gulp-clean-css');
babel = require('gulp-babel');
gulp.task('buildjs', function(cb) {
    
    pump([
        gulp.src('./public/js/*.js'),
        babel({
            presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
        }),
        browserify({
            insertGlobals: false,
            debug: true
        }),
        gulp.dest('dist')
    ], cb)
})

gulp.task('buildjsprod', function(cb) {
    
    pump([
        gulp.src('./public/js/*.js'),
        babel({
            presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
        }),
        browserify({
            insertGlobals: false,
            debug: true
        }),
        uglifyjs(),
        gulp.dest('dist')
    ], cb)
})
gulp.task('buildcss', function() {
    return gulp.src(['./public/css/*.css', './public/css/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist'))
})

gulp.task('buildcssprod', function() {
    return gulp.src(['./public/css/*.css', './public/css/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
})
gulp.task('buildhelperjs', function(cb) {
        pump([
            gulp.src('./public/helpers/js/*.js'),
            babel({
                presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
            }),
            browserify({
                insertGlobals: false,
                debug: true
            }).on('error', function(err) {
                console.log('no nono ')
            }),
            gulp.dest('dist')
        ], cb)
})
gulp.task('buildhelperjsprod', function(cb) {
        pump([
            gulp.src('./public/helpers/js/*.js'),
            babel({
                presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
            }),
            browserify({
                insertGlobals: false,
                debug: true
            }).on('error', function(err) {
                console.log('no nono ')
            }),
            uglifyjs(),
            gulp.dest('dist')
        ], cb)
})

gulp.task('buildhelpercss', function() {
    return gulp.src(['./public/helpers/css/*.css', './public/helpers/css/*.scss'])
        .pipe(sass())
        .pipe(concat('helper.bundle.css'))
        .pipe(gulp.dest('dist'))
})

gulp.task('buildhelpercssprod', function() {
    return gulp.src(['./public/helpers/css/*.css', './public/helpers/css/*.scss'])
        .pipe(sass())
        .pipe(concat('helper.bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
    gulp.watch('**/*.*', {cwd: 'public'}, ['buildjs', 'buildcss', 'buildhelperjs', 'buildhelpercss'])
})
gulp.task('build',  ['buildjs', 'buildcss', 'buildhelperjs', 'buildhelpercss'])
gulp.task('build:prod', ['buildjsprod', 'buildhelperjsprod', 'buildcssprod', 'buildhelpercssprod' ])
gulp.task('default', ['build', 'watch'])