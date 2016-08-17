'use strict';

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

var UrlGeneratorNamedParamPart = /**
                                  * @function
                                 */function () {
    /**
     * @param {string} paramName
     * @param {Function} translate
    * @function
    */

    function UrlGeneratorNamedParamPart(paramName, translate) {
        _classCallCheck(this, UrlGeneratorNamedParamPart);

        this.paramName = paramName;
        this.translate = translate;
    }

    /**
     * @param {Object} args
     * @returns {string}
     */


    _createClass(UrlGeneratorNamedParamPart, [{
        key: 'generate',
        value: /**
                * @function
                * @param {Object} args
               */function generate(args) {
            if (!args || args[this.paramName] == null) {
                throw new Error('Missing param name: "' + this.paramName + '"');
            }

            if (this.paramName === 'controller' || this.paramName === 'action') {
                return this.translate(args[this.paramName]);
            }

            return args[this.paramName];
        }
    }]);

    return UrlGeneratorNamedParamPart;
}();

exports.default = UrlGeneratorNamedParamPart;
//# sourceMappingURL=UrlGeneratorNamedParamPart.js.map