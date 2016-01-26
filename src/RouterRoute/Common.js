export default class RouterRouteCommon {
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
}
