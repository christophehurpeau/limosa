"use strict";

var _createClass = require("babel-runtime/helpers/create-class").default;

var _classCallCheck = require("babel-runtime/helpers/class-call-check").default;

var _Map = require("babel-runtime/core-js/map").default;

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @class RouterRouteCommon 
* @param namedParams */
let RouterRouteCommon = (function () {
    /**
     * @param {Array} namedParams
     */

    function RouterRouteCommon(namedParams) {
        _classCallCheck(this, RouterRouteCommon);

        this.namedParams = namedParams;
        this.routes = new _Map();
    }

    /**
     * @return {int}
     
    * @memberof RouterRouteCommon 
    * @instance 
    * @method getNamedParamsCount */

    _createClass(RouterRouteCommon, [{
        key: "getNamedParamsCount",
        value: function getNamedParamsCount() {
            return this.namedParams.length;
        }

        /**
         * @param {String} lang
         * @return {RouterRouteLang}
         
        * @memberof RouterRouteCommon 
        * @instance 
        * @method get 
        * @param lang */
    }, {
        key: "get",
        value: function get(lang) {
            return this.routes.get(lang);
        }

        /**
         * @param {String} lang
         * @param {RouterRouteLang} route
         
        * @memberof RouterRouteCommon 
        * @instance 
        * @method set 
        * @param lang 
        * @param route */
    }, {
        key: "set",
        value: function set(lang, route) {
            this.routes.set(lang, route);
        }
    }]);

    return RouterRouteCommon;
})();

exports.default = RouterRouteCommon;
module.exports = exports.default;
//# sourceMappingURL=Common.js.map