module.exports = {
    jshint: require('gulp-jshint'),
    gulp: require('gulp'),
    args: require('yargs').argv,
    mocha:  require('gulp-mocha'),
    util: require('gulp-util'),
    istanbul: require('gulp-istanbul'),
    sonar: require('gulp-sonar'),
    watch: require('gulp-watch'),
    browserSync: require('browser-sync').create(),
    checkstyleReporter: require('gulp-jshint-checkstyle-reporter')
};