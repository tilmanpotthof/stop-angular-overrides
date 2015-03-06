module.exports = function (config) {
  'use strict';
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'stop-angular-overrides.js',
      'test/test.js'
    ],
    junitReporter: {
      outputFile: 'reports/junit/results.xml',
      suite: ''
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS'],
    autoWatch: false,
    singleRun: true,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine'
    ],
    preprocessors: {
      'stop-angular-overrides.js': 'coverage'
    },
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html', dir: 'coverage/html' },
        { type: 'lcov', dir: 'coverage/lcov' }
      ]
    }
  });
};
