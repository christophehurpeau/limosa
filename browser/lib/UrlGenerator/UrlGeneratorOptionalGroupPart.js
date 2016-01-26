'use strict';

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

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlGeneratorOptionalGroupPart = /**
                                     * @function
                                    */function () {
    // parts: UrlGeneratorPartArray;

    /**
     * @param {UrlGeneratorPartArray} parts
    * @function
    */

    function UrlGeneratorOptionalGroupPart(parts) {
        _classCallCheck(this, UrlGeneratorOptionalGroupPart);

        this.parts = parts;
    }

    /**
     * @param {Object} args
     * @returns {string}
     */

    _createClass(UrlGeneratorOptionalGroupPart, [{
        key: 'generate',
        value: /**
                * @function
                * @param args
               */function generate(args) {
            try {
                return this.parts.generate(args);
            } catch (err) {
                return '';
            }
        }
    }]);

    return UrlGeneratorOptionalGroupPart;
}();

exports.default = UrlGeneratorOptionalGroupPart;
//# sourceMappingURL=UrlGeneratorOptionalGroupPart.js.map