"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Convert a simple conf file key=>value into a two-way translation map
 */

var RoutesTranslations = /**
                          * @function
                         */function () {
    /**
     * @param {Map} translations
    * @function
    */

    function RoutesTranslations(translations) {
        _classCallCheck(this, RoutesTranslations);

        this._languages = new Map();

        if (!translations) {
            return;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = translations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2);

                var key = _step$value[0];
                var translationsMap = _step$value[1];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = translationsMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2);

                        var lang = _step2$value[0];
                        var translation = _step2$value[1];

                        if (!this._languages.has(lang)) {
                            this._languages.set(lang, {
                                translate: new Map(),
                                untranslate: new Map()
                            });
                        }

                        var language = this._languages.get(lang);

                        language.translate.set(key.toLowerCase(), translation);
                        language.untranslate.set(translation.toLowerCase(), key);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    /**
     * @param {string} string
     * @param {string} lang
     * @return {string}
     */


    _createClass(RoutesTranslations, [{
        key: "translate",
        value: /**
                * @function
                * @param string
                * @param lang
               */function translate(string, lang) {
            string = string.toLowerCase();
            var translationsMap = this._languages.get(lang).translate;

            if (!translationsMap.has(string)) {
                throw new Error("Missing translation " + string + " for lang " + lang);
            }

            return translationsMap.get(string);
        }

        /**
         * @param {string} string
         * @param {string} lang
         * @return {string}
         */

    }, {
        key: "untranslate",
        value: /**
                * @function
                * @param string
                * @param lang
               */function untranslate(string, lang) {
            string = string.toLowerCase();
            var translationsMap = this._languages.get(lang).untranslate;

            if (!translationsMap.has(string)) {
                throw new Error("Missing untranslation " + string + " for lang " + lang);
            }

            return translationsMap.get(string);
        }
    }]);

    return RoutesTranslations;
}();

exports.default = RoutesTranslations;
//# sourceMappingURL=RoutesTranslations.js.map