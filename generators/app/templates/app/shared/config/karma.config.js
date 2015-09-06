// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-09-19 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser

    files: [
      'tmp/build/js/_bower.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/**/*.service.js',
      'app/**/*.factory.js',
      'app/**/*.filter.js',
      'app/**/*.template.html',
      'app/**/*.directive.js',
      'app/**/*.controller.js',
      'app/**/*.routes.js',
      'app/**/*.module.js',
      'tmp/build/js/config.js',
      'app/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    // coverage reporter generates the coverage
    reporters: ['dots', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/**/*.service.js': ['coverage'],
      'app/**/*.factory.js': ['coverage'],
      'app/**/*.filter.js': ['coverage'],
      'app/**/*.directive.js': ['coverage'],
      'app/**/*.controller.js': ['coverage'],
      'app/**/*.routes.js': ['coverage'],
      'app/**/*.module.js': ['coverage'],
      'app/**/*.template.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        // If your build process changes the path to your templates,
        // use stripPrefix and prependPrefix to adjust it.
        // stripPrefix: 'source/path/to/templates/.*/',
        // prependPrefix: 'web/path/to/templates/',

        // the name of the Angular module to create
        moduleName: 'app.test.templates'
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : 'tmp/coverage/',
      // file: 'coverage.txt'
    }
  });
};
