var gulp = require('gulp');
var closureDeps = require('gulp-closure-deps');
var closureList = require('..');
var fs = require('fs');
var es = require('event-stream');
var assert = require('assert');


var closureDir = 'node_modules/google-closure-library/closure/goog/'

describe('gulp-closure-builder-list', function() {
  it('should generate a manifest file', function(done) {
    var stream =
      gulp.src(['test/js/*.js', closureDir + '/**/*.js'])
      .pipe(closureDeps({
        fileName: 'deps.js'
      }))
      .pipe(closureList({
        entryPoint: 'main' 
      }));
    stream.on('data', function(file) {
      var files = file.contents.toString("utf8").match(/[^\r\n]+/g);
      
      var mainIndex = files.indexOf('test/js/main.js');
      var moduleIndex = files.indexOf('test/js/module.js');
      var testIndex = files.indexOf('test/js/test_module.js');
      var googDomIndex = files.indexOf(closureDir + 'dom/dom.js');
      assert.ok(mainIndex != -1);
      assert.ok(moduleIndex != -1);
      assert.ok(googDomIndex != -1);
      assert.equal(testIndex, -1);
      assert.ok(mainIndex > moduleIndex);
      assert.ok(moduleIndex > googDomIndex);

      done();
    });
  });

  it('should fail if no entry point is given', function(done) {
    var stream =
      gulp.src(['test/js/*.js', closureDir + '/**/*.js'])
      .pipe(closureDeps({
        fileName: 'deps.js'
      }))
      .pipe(closureList({
      }));
    stream.on('error', function(file) {
      done();
    });
    stream.on('end', function(file) {
      assert.fail();
      done();
    });
  });
});

