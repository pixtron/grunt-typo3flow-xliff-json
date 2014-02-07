module.exports = function(grunt) {
  var convertToJson = require('../lib/convertToJson') 
    , path = require('path');

  grunt.registerMultiTask('xliff', 'Xliff Angulartranslate task', function() {
    var done = this.async()
      , options = this.options()
      , target = this.target;

    grunt.verbose.writeflags(options, 'Options');

    grunt.util.async.forEachSeries(this.files, function(file, next) {
      var files = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }

        return true;
      });

      if (files.length === 0) {
        grunt.log.warn('No files specified for target: "' + target + '"');
        return next();
      }

      var destinationPath = file.dest;

      for(var i = 0; i < files.length; i++) {
        var filepath = files[i]
          , basename = path.basename(filepath).toLowerCase().substring(-4, 4);

        grunt.log.writeln('converting xliff file "' + filepath + '" to json');

        convertToJson(grunt.file.read(filepath), function(err, json) {
          if(err) {
            grunt.log.error(err);
            return false;
          }
          
          for(var j = 0; j < json.length; j++) {
            var file = json[j]
              , destinationFilepath = destinationPath + basename + '.' + file.language + '.json';

            grunt.log.writeln('writing json contents to file "' + destinationFilepath + '"');
            grunt.file.write(destinationFilepath, JSON.stringify(file.contents));
          }

          return true;
        });
      }

      next();
    }, done);
  });
};