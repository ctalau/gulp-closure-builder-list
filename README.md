# [gulp](http://gulpjs.com)-closure-builder-list
[![Build Status](https://secure.travis-ci.org/ctalau/gulp-closure-builder-list.png?branch=master)](http://travis-ci.org/ctalau/gulp-closure-builder-list) [![Dependency Status](https://david-dm.org/ctalau/gulp-closure-builder-list.png)](https://david-dm.org/ctalau/gulp-closure-builder-list) [![devDependency Status](https://david-dm.org/ctalau/gulp-closure-builder-list/dev-status.png)](https://david-dm.org/ctalau/gulp-closure-builder-list#info=devDependencies)

> Gulp plugin that implements Google ClosureBuilder's list output mode

This plugin receives several dependency files for Closure Libraries, e.g. created with [gulp-closure-deps](https://github.com/steida/gulp-closure-deps) and outputs all files that contain transitive depdendencies of a specified entry point.

The need for such a plugin comes from [JsTestDriver](https://github.com/wesabe/JsTestDriver) which requires a list of files to be loaded during tests. When you are working with closure library, you may need to load hundreds of file, so maintaining such a configuration file manually is not feasible. 

## Example

```js
var closureDeps = require('gulp-closure-deps');
var closureList = require('gulp-closure-builder-list');

gulp.task('default', function() {
  return gulp.src(['js/*.js', 'bower_components/closure-library/closure/goog/**/*.js'])
    .pipe(closureDeps({
      fileName: 'deps.js'
    }))
    .pipe(closureList({
      entryPoint: 'main' 
    }))
    .pipe(gulp.dest('build'));
});
```

## API

### closureList(options)

#### options

##### fileName

Type: `String`  
Default: `manifest.mf`

Generated file name.

##### entryPoint

Type: `String`  

The entry point of the Google Closure Compiler compilation.

## License

MIT © [Cristian Talau](https://github.com/ctalau)

