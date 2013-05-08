# grunt-jst-concat

> concat jst file to module's js file

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jst-concat --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jst-concat');
```

## The "jst_concat" task

### Overview
In your project's Gruntfile, add a section named `jst_concat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jst_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.separator_start
Type: `String`
Default value: `''`

A string value that is used to do something with whatever.

#### options.separator_end
Type: `String`
Default value: `''`

A string value that is used to do something with whatever.

#### options.jst_path
Type: `String`
Default value: `'tmp/template/'`

compiled jst template path

#### options.ext
Type: `String`
Default value: `'.jst'`

jst template extension

#### options.pattern
Type: `String`
Default value: `'/CustomGetTemplateFn\s*\(\'(.*?).html\'\)/g'`

A regex pattern that is used to get template path list

#### options.replace_text
Type: `String`
Default value: `'$1'`

A string value that is used to replace template name

#### options.replace
Type: `Function`
Default value: `null`

A function that is used to do something you want.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  jst_concat: {
    options: {},
    files: {
      'tmp/modules/BookModule.js': ['test/fixtures/modules/BookModule.js']
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  jst_concat: {
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
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
