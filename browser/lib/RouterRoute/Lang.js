"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var RouterRouteLang = /**
                       * @function
                      */function () {
    /**
     * @param {RegExp} regExp
     * @param {RouteRouteLangUrlGenerator} urlGenerator
    * @function
    */

    function RouterRouteLang(regExp, urlGenerator) {
        _classCallCheck(this, RouterRouteLang);

        this.regExp = regExp;
        this.urlGenerator = urlGenerator;
    }

    /**
     * @param {string} input
     * @return {Array}
     */


    _createClass(RouterRouteLang, [{
        key: "match",
        value: /**
                * @function
                * @param input
               */function match(input) {
            return input.match(this.regExp);
        }

        /**
         * Url generator
         *
         * @param {object} args
         * @returns {string}
         * @throws Error
         */

    }, {
        key: "url",
        value: /**
                * @function
                * @param args
               */function url(args) {
            return this.urlGenerator.generate(args);
        }
    }]);

    return RouterRouteLang;
}();

exports.default = RouterRouteLang;
//# sourceMappingURL=Lang.js.map