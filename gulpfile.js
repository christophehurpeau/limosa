"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var traceur = require('gulp-traceur');
var insert = require('gulp-insert');
var exec = require('child_process').exec;

var paths = {
    scripts: 'src/**/*',
    dist: 'lib/',
};

gulp.task('lint', function() {
    return gulp.src([ 'gulpfile.js', paths.scripts ])
        .pipe(plumber())
        .pipe(insert.prepend("\"use strict\";\n"))
        .pipe(jshint(
            {
                "globalstrict": true,
                "esnext": true,
                "camelcase": true,
                "curly": true,
                "freeze": true,
                "indent": 4,
                "latedef": "nofunc",
                "newcap": true,
                "noarg": true,
                "undef": true,
                "unused": "vars",
                "maxparams": 8,
                "maxdepth": 6,
                "maxlen": 120,
                "boss": true,
                "eqnull": true,
                "node": true,
            }
        ))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(traceur({ }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('docs', function(onEnd) {
    exec('./node_modules/.bin/jsdoc src/ src/router_route/ -d docs/', function(error, stdout, stderr) {
        console.log(stdout);
        if (error) {
            console.error(error);
            //return onEnd(error);
        }
        if (stderr) {
            console.error(stderr);
            //return onEnd(stderr);
        }
        onEnd();
    });
});


gulp.task('watch', ['lint', 'build', 'docs'], function() {
    gulp.watch(paths.scripts, ['lint', 'build', 'docs']);
});