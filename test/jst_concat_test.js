'use strict';

var grunt = require('grunt');

exports.jst_concat = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/modules/BookModule.js');
    var expected = grunt.file.read('test/expected/BookModule.js');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/modules/ShopModule.js');
    var expected = grunt.file.read('test/expected/ShopModule.js');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
