/**
 * Convert a simple conf file key=>value into a two-way translation map
 */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Map = require('babel-runtime/core-js/map').default;

var _getIterator = require('babel-runtime/core-js/get-iterator').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class RoutesTranslations 
* @param {Map} translations */
let RoutesTranslations = (function () {
    function RoutesTranslations(translations) {
        _classCallCheck(this, RoutesTranslations);

        this._languages = new _Map();

        if (!translations) {
            return;
        }

        for (var _iterator = translations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            let key = _ref[0];
            let translationsMap = _ref[1];

            for (var _iterator2 = translationsMap, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                let lang = _ref2[0];
                let translation = _ref2[1];

                if (!this._languages.has(lang)) {
                    this._languages.set(lang, {
                        translate: new _Map(),
                        untranslate: new _Map()
                    });
                }

                const language = this._languages.get(lang);

                language.translate.set(key.toLowerCase(), translation);
                language.untranslate.set(translation.toLowerCase(), key);
            }
        }
    }

    /**
     * @param {String} string
     * @param {String} lang
     * @return {String}
     
    * @memberof RoutesTranslations 
    * @instance 
    * @method translate 
    * @param string 
    * @param lang */

    _createClass(RoutesTranslations, [{
        key: 'translate',
        value: function translate(string, lang) {
            string = string.toLowerCase();
            const translationsMap = this._languages.get(lang).translate;

            if (!translationsMap.has(string)) {
                throw new Error('Missing translation ' + string + ' for lang ' + lang);
            }

            return translationsMap.get(string);
        }

        /**
         * @param {String} string
         * @param {String} lang
         * @return {String}
         
        * @memberof RoutesTranslations 
        * @instance 
        * @method untranslate 
        * @param string 
        * @param lang */
    }, {
        key: 'untranslate',
        value: function untranslate(string, lang) {
            string = string.toLowerCase();
            const translationsMap = this._languages.get(lang).untranslate;

            if (!translationsMap.has(string)) {
                throw new Error('Missing untranslation ' + string + ' for lang ' + lang);
            }

            return translationsMap.get(string);
        }
    }]);

    return RoutesTranslations;
})();

exports.default = RoutesTranslations;
module.exports = exports.default;
//# sourceMappingURL=RoutesTranslations.js.map