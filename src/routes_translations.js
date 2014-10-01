var S = require('springbokjs-utils');

/**
 * Routes Translations
 *
 * Convert a simple conf file key=>value into a two-way translation map
 *
 * @class
 */
module.exports = class RoutesTranslations {
    /**
     * @param {Map} translations
     */
    constructor(translations) {
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
    }

    /**
     * @param {String} string
     * @param {String} lang
     * @return {String}
     */
    translate(string, lang) {
        string = string.toLowerCase();
        var translationsMap = this._translations.get('>' + lang);

        if (!translationsMap.has(string)) {
            throw new Error('Missing translation ' + string + ' for lang ' + lang);
        }
        return translationsMap.get(string);
    }

    /**
     * @param {String} string
     * @param {String} lang
     * @return {String}
     */
    untranslate(string, lang) {
        string = string.toLowerCase();
        var translationsMap = this._translations.get(lang + '>');

        if (!translationsMap.has(string)) {
            throw new Error('Missing untranslation ' + string + ' for lang ' + lang);
        }
        return translationsMap.get(string);
    }
};
