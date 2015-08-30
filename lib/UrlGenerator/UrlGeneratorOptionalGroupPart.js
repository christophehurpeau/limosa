'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class UrlGeneratorOptionalGroupPart 
* @param {UrlGeneratorPartArray} parts */
let UrlGeneratorOptionalGroupPart = (function () {
    function UrlGeneratorOptionalGroupPart(parts) {
        _classCallCheck(this, UrlGeneratorOptionalGroupPart);

        this.parts = parts;
    }

    _createClass(UrlGeneratorOptionalGroupPart, [{
        key: 'generate',
        /** @memberof UrlGeneratorOptionalGroupPart 
        * @instance 
        * @method generate */value: function generate() {
            try {
                return this.parts.generate(args);
            } catch (err) {
                return '';
            }
        }
    }]);

    return UrlGeneratorOptionalGroupPart;
})();

exports.default = UrlGeneratorOptionalGroupPart;
module.exports = exports.default;
//# sourceMappingURL=UrlGeneratorOptionalGroupPart.js.map