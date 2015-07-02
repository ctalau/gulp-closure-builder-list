var Set = require("collections/set");
var through = require('through');
var gutil = require('gulp-util');

const PLUGIN_NAME = 'gulp-closure-manifest';

module.exports = function(opt) {
  opt = opt || {};
  var fileName = opt.fileName || 'manifest.mf';
  var entryPoint = opt.entryPoint;

  var deps = {};
  var symbolsFile = {};

  // Replacement for goog.addDependency to just records the dependencies.
  function googAddDependency(file, provides, requires) {
    provides.forEach(function(provided) {
      symbolsFile[provided] = file;
      deps[provided] = deps[provided] || [];
      Array.prototype.push.apply(deps[provided], requires)
    });
  }

  // Adds the transitive dependencies of the symbol to the manifest. 
  function generateManifest(entryPoint) {
    var added = new Set();
    var manifest = [];

    function addTransitiveDeps(symbol) {
      added.add(symbol);
			var symDeps = deps[symbol];
			if (symDeps) {			
				symDeps.forEach(function(dependency) {
					if (!added.has(dependency)) {
						addTransitiveDeps(dependency);
					}
				});
			} else {
				gutil.log('No deps found for symbol', symbol, deps);
			}
      manifest.push(symbolsFile[symbol]);
    }

    addTransitiveDeps(entryPoint);
    return manifest;
  }
  
  // Generates a manifest file with one path per line.
  function generateManifestFile() {
    if (Object.keys(deps).length === 0) {
      this.emit('end');
    } else if (!entryPoint) {
      this.emit('error',
          new gutil.PluginError(PLUGIN_NAME, 'Closure entry point is not specified'));    
    } else {
      var manifest = generateManifest(entryPoint);

      var manifestFile = new gutil.File({
        contents: new Buffer(manifest.join('\n')),
        path: fileName
      });

      this.emit('data', manifestFile);
      this.emit('end');
    }
  }

  // Loads a dependency file in the current data structure.
  function loadDepsFile(file) {
    var goog = {addDependency: googAddDependency}; 
    eval(file.contents.toString('utf8'));
  }

  return through(loadDepsFile, generateManifestFile);
};

