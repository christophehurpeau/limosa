'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Lang = require('./Lang');

var _Lang2 = _interopRequireDefault(_Lang);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RouterRouteCommon = class RouterRouteCommon {

    /**
     * @param {Array} namedParams
    */
    constructor(namedParams) {
        this.namedParams = namedParams;
        this.routes = new Map();
    }

    /**
     * @return {number}
     */
    getNamedParamsCount() {
        return this.namedParams.length;
    }

    /**
     * @param {string} lang
     * @return {RouterRouteLang}
    * @returns {RouterRouteLang}
    */
    get(lang) {
        return this.routes.get(lang);
    }

    /**
     * @param {string} lang
     * @param {RouterRouteLang} route
    */
    set(lang, route) {
        this.routes.set(lang, route);
    }
};
exports.default = RouterRouteCommon;
//# sourceMappingURL=Common.js.map