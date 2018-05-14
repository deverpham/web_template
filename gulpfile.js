var gulp = require('gulp');
const concat = require('gulp-concat');
const path = require('path');
const sass = require('gulp-sass');
const  fs = require('fs');
const inject = require('gulp-inject-string');
const run = require('gulp-run-command').default;
const cleanCSS = require('gulp-clean-css');
gulp.task('buildjs', function() {
    return gulp.src('./vendor/core/ui/assets/js/*.js')
        .pipe(concat('main.bundle.js'))
        .pipe(gulp.dest('./vendor/core/ui/dist'))
})
gulp.task('buildcss', function() {
    const pathTheme = path.join(__dirname, './src/superTheme/public/themeOveride.scss');
    const data = fs.readFileSync(pathTheme).toString();
    return gulp.src(['./src/superTheme/public/themeOveride.scss', './vendor/core/ui/assets/css/*.css', './vendor/core/ui/assets/css/*.scss'])
    .pipe(inject.prepend(data))
    .pipe(sass())
    .pipe(concat('style.bundle.css'))
    .pipe(gulp.dest('./vendor/core/ui/dist'))
})
gulp.task('buildcssprod', function() {
    const pathTheme = path.join(__dirname, './src/superTheme/public/themeOveride.scss');
    const data = fs.readFileSync(pathTheme).toString();
    return gulp.src(['./src/superTheme/public/themeOveride.scss', './vendor/core/ui/assets/css/*.css', './vendor/core/ui/assets/css/*.scss'])
    .pipe(inject.prepend(data))
    .pipe(sass())
    .pipe(concat('style.bundle.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./vendor/core/ui/dist'))
})
gulp.task('watch', function() {
    gulp.watch(['./src/superTheme/public/themeOveride.scss','./vendor/core/ui/assets/**/*.*'], ['buildjs', 'buildcss'])
})
gulp.task('start server', run('nodemon app.js --config nodemon.json'))
gulp.task('start_gulp_theme', run('gulp --gulpfile src/superTheme/gulpfile.js'))
gulp.task('default', ['buildjs', 'buildcss', 'watch', 'start server'])
gulp.task('dev', ['default', 'start_gulp_theme'])
gulp.task('memory', run('node --trace_gc app.js'))
gulp.task('build:prod', ['buildjs', 'buildcssprod'])
