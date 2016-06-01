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

var RouterRouteCommon = /**
                         * @function
                        */function () {
    /**
     * @param {Array} namedParams
    * @function
    */

    function RouterRouteCommon(namedParams) {
        _classCallCheck(this, RouterRouteCommon);

        this.namedParams = namedParams;
        this.routes = new Map();
    }

    /**
     * @return {number}
     */


    _createClass(RouterRouteCommon, [{
        key: "getNamedParamsCount",
        value: /**
                * @function
               */function getNamedParamsCount() {
            return this.namedParams.length;
        }

        /**
         * @param {string} lang
         * @return {RouterRouteLang}
         */

    }, {
        key: "get",
        value: /**
                * @function
                * @param lang
               */function get(lang) {
            return this.routes.get(lang);
        }

        /**
         * @param {string} lang
         * @param {RouterRouteLang} route
         */

    }, {
        key: "set",
        value: /**
                * @function
                * @param lang
                * @param route
               */function set(lang, route) {
            this.routes.set(lang, route);
        }
    }]);

    return RouterRouteCommon;
}();

exports.default = RouterRouteCommon;
//# sourceMappingURL=Common.js.map