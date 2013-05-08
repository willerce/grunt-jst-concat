/*
 * grunt-jst-concat
 * https://github.com/willerce/grunt-jst-concat
 *
 * Copyright (c) 2013 willerce
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('jst_concat', 'Your task description goes here.', function () {
    var options = this.options({
      separator_start: '',
      separator_end: '',
      jst_path: 'tmp/template/',
      jst_ext: ".jst",
      pattern: /CustomGetTemplateFn\s*\(\'(.*?).html\'\)/g,
      replace_text: "$1",
      replace: null
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (f) {
      f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {

          var js_source = grunt.file.read(filepath);

          //通过正则找出所有的 GetTemplate() 方法，得到模版文件列表
          var myregexp = options.pattern;
          var group = js_source.match(myregexp);

          if (group) {

            var output = "";
            var arr = {};

            for (var i = 0; i < group.length; i++) {

              var file_name = group[i].replace(myregexp, options.replace_text);

              //当前JS文件中，此模版还未被合并
              if (!arr[file_name]) {

                //标识此模版已经合并
                arr[file_name] = true;
                var jst = grunt.file.read(options.jst_path + file_name + options.jst_ext);

                //运行自定义替换函数
                if (options.replace) {
                  jst = options.replace(jst);
                }

                output = output + jst;
              }
            }

            js_source = options.separator_start + output + options.separator_end + js_source;

            grunt.log.writeln('File "' + filepath + '" contact jst.');
          }

          grunt.file.write(f.dest, js_source);

        });
    });
  });

};
