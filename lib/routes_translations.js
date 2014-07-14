"use strict";
var $__Object$defineProperty = Object.defineProperty;
var S = require('springbokjs-utils');
module.exports = function() {
  "use strict";
  function RoutesTranslations(translations) {
    this._translations = new Map();
    if (translations) {
      S.forEach(translations, function(translationsMap, key) {
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
  }
  $__Object$defineProperty(RoutesTranslations.prototype, "translate", {
    value: function(string, lang) {
      string = string.toLowerCase();
      var translationsMap = this._translations.get('>' + lang);
      if (!translationsMap.has(string)) {
        throw new Error('Missing translation ' + string + ' for lang ' + lang);
      }
      return translationsMap.get(string);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(RoutesTranslations.prototype, "untranslate", {
    value: function(string, lang) {
      string = string.toLowerCase();
      var translationsMap = this._translations.get(lang + '>');
      if (!translationsMap.has(string)) {
        throw new Error('Missing untranslation ' + string + ' for lang ' + lang);
      }
      return translationsMap.get(string);
    },
    enumerable: false,
    writable: true
  });
  return RoutesTranslations;
}();

//# sourceMappingURL=routes_translations.js.map