var S = require('springbokjs-utils');

/**
 * @class
 */
var RouterRouteCommon = S.newClass();
module.exports = RouterRouteCommon;

RouterRouteCommon.extendPrototype( /** @lends RouterRouteCommon.prototype */ {
    /**
     * @constructs
     * @param {Array} namedParams
     */
    construct(namedParams) {
        this.namedParams = namedParams;
        this.routes = new Map();
    },

    /**
     * @return {int}
     */
    getNamedParamsCount() {
        return this.namedParams.length;
    },

    /**
     * @param {String} lang
     * @return {RouterRouteLang}
     */
    get(lang) {
        return this.routes[lang];
    },

    /**
     * @param {String} lang
     * @param {RouterRouteLang} route
     */
    set(lang, route) {
        this.routes[lang] = route;
    }
});