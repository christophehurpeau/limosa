"use strict";
var __moduleName = "routes_translations";
var S = require('springbokjs-utils');
var RoutesTranslations = S.newClass();
module.exports = RoutesTranslations;
S.extendPrototype(RoutesTranslations, {
  construct: function(translations) {
    var $__0 = this;
    this._translations = new Map();
    if (translations) {
      S.forEach(translations, (function(translationsMap, key) {
        S.forEach(translationsMap, (function(translation, lang) {
          if (!$__0._translations.has('>' + lang)) {
            $__0._translations.set('>' + lang, new Map());
            $__0._translations.set(lang + '>', new Map());
          }
          $__0._translations.get('>' + lang).set(key.toLowerCase(), translation);
          $__0._translations.get(lang + '>').set(translation.toLowerCase(), key);
        }));
      }));
    }
  },
  translate: function(string, lang) {
    string = string.toLowerCase();
    var translationsMap = this._translations.get('>' + lang);
    if (!translationsMap.has(string)) {
      throw new Error('Missing translation ' + string + ' for lang ' + lang);
    }
    return translationsMap.get(string);
  },
  untranslate: function(string, lang) {
    string = string.toLowerCase();
    var translationsMap = this._translations.get(lang + '>');
    if (!translationsMap.has(string)) {
      throw new Error('Missing untranslation ' + string + ' for lang ' + lang);
    }
    return translationsMap.get(string);
  }
});
