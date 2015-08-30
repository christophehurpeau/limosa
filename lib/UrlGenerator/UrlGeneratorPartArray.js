'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class UrlGeneratorPartArray 
* @param {Array} parts */
let UrlGeneratorPartArray = (function () {
    function UrlGeneratorPartArray(parts) {
        _classCallCheck(this, UrlGeneratorPartArray);

        this.parts = parts;
    }

    _createClass(UrlGeneratorPartArray, [{
        key: 'generate',
        /** @memberof UrlGeneratorPartArray 
        * @instance 
        * @method generate 
        * @param args */value: function generate(args) {
            return this.parts.map(function (p) {
                return p.generate(args);
            }).join('');
        }
    }]);

    return UrlGeneratorPartArray;
})();

exports.default = UrlGeneratorPartArray;
module.exports = exports.default;
//# sourceMappingURL=UrlGeneratorPartArray.js.map