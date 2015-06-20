# [gulp](http://gulpjs.com)-closure-builder-list
[![Build Status](https://secure.travis-ci.org/ctalau/gulp-closure-builder-list.png?branch=master)](http://travis-ci.org/ctalau/gulp-closure-builder-list) [![Dependency Status](https://david-dm.org/ctalau/gulp-closure-builder-list.png)](https://david-dm.org/ctalau/gulp-closure-builder-list) [![devDependency Status](https://david-dm.org/ctalau/gulp-closure-builder-list/dev-status.png)](https://david-dm.org/ctalau/gulp-closure-builder-list#info=devDependencies)

> Gulp plugin that implements Google ClosureBuilder's list output mode

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

