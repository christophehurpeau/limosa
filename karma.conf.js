module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        frameworks: ['mocha', 'proclaim'],

        browsers: [
            'Firefox',
            'Chrome',
            'PhantomJS',
            //'IE6 - WinXP',
            //'IE7 - WinXP',
            //'IE8 - WinXP',
            //'IE9 - Win7',
            //'IE10 - Win7',
            //'IE11 - Win7',
        ],

        files: [
            'dist/IE9.js',
            'dist/es5-compat.js',
            'dist/es6-compat.js',
            'mocha.conf.js',
            'dist/test.js',
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // enable / disable colors in the output (reporters and logs)
        colors: !process.env.DRONE,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
    });
};
