/**
 * @class RouterRouteCommon
 */
export default class RouterRouteCommon {
    /**
     * @constructs
     * @param {Array} namedParams
     */
    constructor(namedParams) {
        this.namedParams = namedParams;
        this.routes = new Map();
    }

    /**
     * @return {int}
     */
    getNamedParamsCount() {
        return this.namedParams.length;
    }

    /**
     * @param {String} lang
     * @return {RouterRouteLang}
     */
    get(lang) {
        return this.routes.get(lang);
    }

    /**
     * @param {String} lang
     * @param {RouterRouteLang} route
     */
    set(lang, route) {
        this.routes.set(lang, route);
    }
}
