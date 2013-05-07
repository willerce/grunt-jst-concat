/*
 * grunt-jst-concat
 * https://github.com/willerce/grunt-jst-concat
 *
 * Copyright (c) 2013 willerce
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    jst: {
      compile: {
        options: {
          prettify: true
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'test/fixtures/template/',      // Src matches are relative to this path.
            src: ['**/*.html'], // Actual pattern(s) to match.
            dest: 'tmp/template/',   // Destination path prefix.
            ext: '.jst'   // Dest filepaths will have this extension.
          }
        ]
      }
    },

    // Configuration to be run (and then tested).
    jst_concat: {
      default_options: {
        options: {
        },
        files: {
          'tmp/modules/BookModule.js': ['test/fixtures/modules/BookModule.js']
        }
      },
      custom_options: {
        options: {
          separator_start: '/**start**/',
          separator_end: '/**end**/',
          jst_path: 'tmp/template/',
          ext: ".jst",
          pattern: /CustomGetTemplateFn\s*\(\'(.*?).html\'\)/g,
          replace: function(jst){
            jst = jst.replace('this.ajst=this.ajst||{},', "");
            jst = jst.replace(/\n|\r/g, "");
            return jst;
          }
        },
        files: {
          'tmp/modules/ShopModule.js': ['test/fixtures/modules/ShopModule.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jst');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jst', 'jst_concat', 'nodeunit']);

  // By default, lint and run all testweibs.
  grunt.registerTask('default', ['jshint', 'test']);


};
