//import * as S from 'springbokjs-utils';
"use strict";
var S = require('springbokjs-utils');

exports.default = function() {
  var RoutesTranslations = function RoutesTranslations(translations) {
      this._translations = new Map();

      if (translations) {
          S.forEach(translations, function(translationsMap, key) { //keep functions here
              S.forEach(translationsMap, function(translation, lang) {
                  if (!this._translations.has('>' + lang)) {
                      this._translations.set('>' + lang, new Map());
                      this._translations.set(lang + '>', new Map());
                  }
                  this._translations.get('>' + lang).set(key.toLowerCase(), translation);
                  this._translations.get(lang + '>').set(translation.toLowerCase(), key);
              }.bind(this));
          }.bind(this));
      }
  };

  Object.defineProperties(RoutesTranslations.prototype, {
    translate: {
      writable: true,

      value: function(string, lang) {
          string = string.toLowerCase();
          var translationsMap = this._translations.get('>' + lang);

          if (!translationsMap.has(string)) {
              throw new Error('Missing translation ' + string + ' for lang ' + lang);
          }
          return translationsMap.get(string);
      }
    },

    untranslate: {
      writable: true,

      value: function(string, lang) {
          string = string.toLowerCase();
          var translationsMap = this._translations.get(lang + '>');

          if (!translationsMap.has(string)) {
              throw new Error('Missing untranslation ' + string + ' for lang ' + lang);
          }
          return translationsMap.get(string);
      }
    }
  });

  return RoutesTranslations;
}();

//# sourceMappingURL=RoutesTranslations.js.map