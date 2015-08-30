"use strict";

var _createClass = require("babel-runtime/helpers/create-class").default;

var _classCallCheck = require("babel-runtime/helpers/class-call-check").default;

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @class RouterRouteLang 
* @param {RegExp} regExp 
* @param {RouteRouteLangUrlGenerator} urlGenerator */
let RouterRouteLang = (function () {
    function RouterRouteLang(regExp, urlGenerator) {
        _classCallCheck(this, RouterRouteLang);

        this.regExp = regExp;
        this.urlGenerator = urlGenerator;
    }

    /**
     * @return {Array}
     
    * @memberof RouterRouteLang 
    * @instance 
    * @method match 
    * @param input */

    _createClass(RouterRouteLang, [{
        key: "match",
        value: function match(input) {
            return input.match(this.regExp);
        }

        /**
         * Url generator
         *
         * @param {object} args
         * @returns {string}
         * @throws Error
         
        * @memberof RouterRouteLang 
        * @instance 
        * @method url 
        * @param args */
    }, {
        key: "url",
        value: function url(args) {
            return this.urlGenerator.generate(args);
        }
    }]);

    return RouterRouteLang;
})();

exports.default = RouterRouteLang;
module.exports = exports.default;
//# sourceMappingURL=Lang.js.map