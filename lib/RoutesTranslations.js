"use strict";

var _slicedToArray = /**
                      * @function
                     */ function () { /**
                                       * @function
                                       * @param arr
                                       * @param i
                                      */ function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return (/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @function
                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param arr
                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param i
                                                                                                                                                                                                                                                                                                                                                                                                                                                          */ function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } } ); }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Convert a simple conf file key=>value into a two-way translation map
 */
let RoutesTranslations = class RoutesTranslations {
    /**
     * @param {Map} translations
    */
    constructor(translations) {
        this._languages = new Map();

        if (!translations) {
            return;
        }

        for (let _ref of translations) {
            var _ref2 = _slicedToArray(_ref, 2);

            let key = _ref2[0];
            let translationsMap = _ref2[1];

            for (let _ref3 of translationsMap) {
                var _ref4 = _slicedToArray(_ref3, 2);

                let lang = _ref4[0];
                let translation = _ref4[1];

                if (!this._languages.has(lang)) {
                    this._languages.set(lang, {
                        translate: new Map(),
                        untranslate: new Map()
                    });
                }

                const language = this._languages.get(lang);

                language.translate.set(key.toLowerCase(), translation);
                language.untranslate.set(translation.toLowerCase(), key);
            }
        }
    }

    /**
     * @param {string} string
     * @param {string} lang
     * @return {string}
    */
    translate(string, lang) {
        string = string.toLowerCase();
        const translationsMap = this._languages.get(lang).translate;

        if (!translationsMap.has(string)) {
            throw new Error(`Missing translation ${ string } for lang ${ lang }`);
        }

        return translationsMap.get(string);
    }

    /**
     * @param {string} string
     * @param {string} lang
     * @return {string}
    */
    untranslate(string, lang) {
        string = string.toLowerCase();
        const translationsMap = this._languages.get(lang).untranslate;

        if (!translationsMap.has(string)) {
            throw new Error(`Missing untranslation ${ string } for lang ${ lang }`);
        }

        return translationsMap.get(string);
    }
};
exports.default = RoutesTranslations;
//# sourceMappingURL=RoutesTranslations.js.map