var xliff2json = require('xliff2json');

module.exports = function(fileContent, callback){
  if(typeof callback !== 'function'){
    throw new Error('You must provide a callback function');
  }

  if(typeof fileContent === 'undefined' || fileContent.trim() === ''){
    return callback(new Error('You did not specify any fileContent'));
  }

  var results = [];

  var x = new xliff2json({
      cleanJSON: false,
      decorateJSON: false
  });

  x.parseXliff(fileContent, {languageHeader:true}, function(json){
    for(var i = 0; i < json.xliff.file.length; i++) {
      var sourceLanguage = json.xliff.file[i]['$']['source-language']
        , targetLanguage = json.xliff.file[i]['$']['target-language']
        , units = json.xliff.file[i].body[0]['trans-unit']
        , language = targetLanguage || sourceLanguage;
        
        if(language) {
          results.push({language: language, contents: {}});
          
          for(var j = 0; j < units.length; j++) {
            var id = units[j]['$'].id
              , translation = targetLanguage ? units[j]['target'] : units[j]['source'];

            if(translation && typeof translation === 'object') {
              translation = translation[0];
            }

            results[i]['contents'][id] = translation;
          }
        }
      }

    callback(undefined, results);
  });
};