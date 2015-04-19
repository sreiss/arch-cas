var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del');

var appRoot = 'arch-client';
var jsSrc = [
    appRoot + '/src/lib/angular/angular.js',
    appRoot + '/src/arch-client.js',
    appRoot + '/src/core/**/**/*.js',
    appRoot + '/src/plugins/**/**/*.js'
];

gulp.task('destroyMin', function (cb) {
    del([appRoot + '/dist'], cb);
});

gulp.task('doJs', ['destroyMin'], function () {
    gulp.src(jsSrc)
//           .pipe(uglify())
        .pipe(concat('arch-client.min.js'))
        .pipe(gulp.dest(appRoot + '/dist'));
});

gulp.task('watch', function () {
    gulp.watch(jsSrc, ['doJs']);
});

gulp.task('default', ['destroyMin', 'doJs', 'watch']);