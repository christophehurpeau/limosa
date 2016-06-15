import RouterRouteLang from './Lang';

export default class RouterRouteCommon {
    routes: Map<string, RouterRouteLang>;

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
    get(lang: string): RouterRouteLang {
        return this.routes.get(lang);
    }

    /**
     * @param {string} lang
     * @param {RouterRouteLang} route
     */
    set(lang: string, route: RouterRouteLang) {
        this.routes.set(lang, route);
    }
}
