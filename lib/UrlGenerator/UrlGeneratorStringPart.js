"use strict";

var _createClass = require("babel-runtime/helpers/create-class").default;

var _classCallCheck = require("babel-runtime/helpers/class-call-check").default;

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @class UrlGeneratorStringPart 
* @param string */
let UrlGeneratorStringPart = (function () {
    function UrlGeneratorStringPart(string) {
        _classCallCheck(this, UrlGeneratorStringPart);

        this.string = string;
    }

    _createClass(UrlGeneratorStringPart, [{
        key: "generate",
        /** @memberof UrlGeneratorStringPart 
        * @instance 
        * @method generate */value: function generate() {
            return this.string;
        }
    }]);

    return UrlGeneratorStringPart;
})();

exports.default = UrlGeneratorStringPart;
module.exports = exports.default;
//# sourceMappingURL=UrlGeneratorStringPart.js.map