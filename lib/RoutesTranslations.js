"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var S = require("springbokjs-utils");

/**
 * @class Routes Translations
 *
 * Convert a simple conf file key=>value into a two-way translation map
 *
 */
var RoutesTranslations = (function () {
    /**
     * @param {Map} translations
     */
    function RoutesTranslations(translations) {
        _classCallCheck(this, RoutesTranslations);

        this._translations = new Map();

        if (translations) {
            S.forEach(translations, (function (translationsMap, key) {
                //keep functions here
                S.forEach(translationsMap, (function (translation, lang) {
                    if (!this._translations.has(">" + lang)) {
                        this._translations.set(">" + lang, new Map());
                        this._translations.set(lang + ">", new Map());
                    }
                    this._translations.get(">" + lang).set(key.toLowerCase(), translation);
                    this._translations.get(lang + ">").set(translation.toLowerCase(), key);
                }).bind(this));
            }).bind(this));
        }
    }

    _prototypeProperties(RoutesTranslations, null, {
        translate: {

            /**
             * @param {String} string
             * @param {String} lang
             * @return {String}
             */
            value: function translate(string, lang) {
                string = string.toLowerCase();
                var translationsMap = this._translations.get(">" + lang);

                if (!translationsMap.has(string)) {
                    throw new Error("Missing translation " + string + " for lang " + lang);
                }
                return translationsMap.get(string);
            },
            writable: true,
            configurable: true
        },
        untranslate: {

            /**
             * @param {String} string
             * @param {String} lang
             * @return {String}
             */
            value: function untranslate(string, lang) {
                string = string.toLowerCase();
                var translationsMap = this._translations.get(lang + ">");

                if (!translationsMap.has(string)) {
                    throw new Error("Missing untranslation " + string + " for lang " + lang);
                }
                return translationsMap.get(string);
            },
            writable: true,
            configurable: true
        }
    });

    return RoutesTranslations;
})();

module.exports = RoutesTranslations;
//# sourceMappingURL=RoutesTranslations.js.map