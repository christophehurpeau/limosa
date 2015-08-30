'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class UrlGeneratorNamedParamPart 
* @param paramName 
* @param translate */
let UrlGeneratorNamedParamPart = (function () {
    function UrlGeneratorNamedParamPart(paramName, translate) {
        _classCallCheck(this, UrlGeneratorNamedParamPart);

        this.paramName = paramName;
        this.translate = translate;
    }

    _createClass(UrlGeneratorNamedParamPart, [{
        key: 'generate',
        /** @memberof UrlGeneratorNamedParamPart 
        * @instance 
        * @method generate 
        * @param args */value: function generate(args) {
            if (args[this.paramName] == null) {
                throw new Error('Missing param name: "' + this.paramName + '"');
            }

            if (this.paramName === 'controller' || this.paramName === 'action') {
                return this.translate(args[this.paramName]);
            }

            return args[this.paramName];
        }
    }]);

    return UrlGeneratorNamedParamPart;
})();

exports.default = UrlGeneratorNamedParamPart;
module.exports = exports.default;
//# sourceMappingURL=UrlGeneratorNamedParamPart.js.map