/* global module */
module.exports = function (grunt) {
  'use strict';

  module.require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'nice-package': {
      all: {
        options: {
          blankLine: true
        }
      }
    },

    jshint: {
      'options': {
        jshintrc: '.jshintrc'
      },
      default: {
        'src': [ '*.js', 'test/*.js' ]
      }
    },

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version',
            'private', 'license', 'keywords', 'homepage']
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },

    coveralls: {
      options: {
        debug: true,
        coverage_dir: 'coverage',
        force: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['karma:unit']);

  grunt.registerTask('default', ['deps-ok', 'nice-package', 'sync', 'jshint']);
};
