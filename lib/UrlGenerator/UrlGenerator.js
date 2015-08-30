'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class UrlGenerator 
* @param {UrlGeneratorPartArray} parts 
* @param extension */
let UrlGenerator = (function () {
    function UrlGenerator(parts, extension) {
        _classCallCheck(this, UrlGenerator);

        this.parts = parts;
        this.extension = extension;
    }

    /**
     * @param {object} args
     * @param {string} [args.extension]
     * @param {string} [args.queryString]
     * @param {string} [args.hash]
     * @returns {*}
     
    * @memberof UrlGenerator 
    * @instance 
    * @method generate 
    * @param args */

    _createClass(UrlGenerator, [{
        key: 'generate',
        value: function generate(args) {
            let url = this.parts.generate(args);

            if (args) {
                if (args.extension) {
                    url += '.' + args.extension;
                } else if (this.extension) {
                    url += '.' + this.extension;
                }

                if (args.queryString) {
                    url += '?' + args.queryString; // TODO: use qs ?
                }

                if (args.hash) {
                    url += '#' + args.hash;
                }
            } else if (this.extension) {
                url += '.' + this.extension;
            }

            return url;
        }
    }]);

    return UrlGenerator;
})();

exports.default = UrlGenerator;
module.exports = exports.default;
//# sourceMappingURL=UrlGenerator.js.map