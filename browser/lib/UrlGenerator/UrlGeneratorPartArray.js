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

var UrlGeneratorPartArray = /**
                             * @function
                            */function () {
    /**
     * @function
     * @param {Array} parts
    */
    function UrlGeneratorPartArray(parts) {
        _classCallCheck(this, UrlGeneratorPartArray);

        this.parts = parts;
    }

    /**
     * @param {Object} args
     * @returns {string}
     */

    _createClass(UrlGeneratorPartArray, [{
        key: 'generate',
        value: /**
                * @function
                * @param args
               */function generate(args) {
            return this.parts.map(function (p) {
                return p.generate(args);
            }).join('');
        }
    }]);

    return UrlGeneratorPartArray;
}();

exports.default = UrlGeneratorPartArray;
//# sourceMappingURL=UrlGeneratorPartArray.js.map