import RouterRoute from './RouterRoute/Route';
import RouterRouteSegment from './RouterRoute/Segment';
import Route from './Route';
import RouterRouteCommon from './RouterRoute/Common';

const regExpStartingSlash = /^\/+/;
const regExpEndingSlash = /\/+$/;

export default class Router {
    /**
     * @param {RoutesTranslations} routesTranslations
     */
    constructor(routesTranslations) {
        this._routesMap = new Map();
        this._routes = [];
        this._routesTranslations = routesTranslations;
    }

    /**
     * Get a Route by its key
     *
     * @param {string} key
     * @return {Route}
     */
    get(key: string): ?Route {
        return this._routesMap.get(key);
    }

    /**
     * @param {string} routeKey
     * @param {RouterRouteCommon} route
     */
    addRoute(routeKey: string, route: RouterRouteCommon) {
        if (route instanceof RouterRoute) {
            this._addInternalRoute(routeKey, route);
        }

        this._routes.push(route);
    }

    /**
     * @param {string} routeKey
     * @param {RouterRoute} route
     */
    _addInternalRoute(routeKey: string, route: RouterRoute) {
        if (this._routesMap.has(routeKey)) {
            throw new Error(`duplicate routeKey: "${routeKey}"`);
        }
        this._routesMap.set(routeKey, route);
    }

    /**
     * @param {string} path
     * @param {string=} lang
     * @return {Route}
     */
    find(path: string, lang: string = 'en'): Route {
        path = `/${path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash, '')}`;
        return this._findRoute(this._routes, path, path, lang);
    }

    /**
     * @param {Array} routes
     * @param {string} completePath
     * @param {string} path
     * @param {string} lang
     * @param {Map} namedParams
     * @return {RouterRoute} route the route or undefined if none found
     */
    _findRoute(routes, completePath, path, lang, namedParams) {
        let result;
        routes.some((route, index) => {
            /* RouterRouteLang */
            let routeLang = route.get(lang);
            if (!routeLang) {
                throw new Error(`Cannot find routeLang for lang ${lang} and route ${index}`);
            }

            // console.log(`[springbokjs-router] trying ${routeLang.regExp}`);
            if (this.logger) {
                this.logger.info(`[springbokjs-router] trying ${routeLang.regExp}`);
            }

            const match = routeLang.match(path);
            if (!match) {
                return false;
            }
            // console.log(match);

            match.shift(); // remove m[0];
            let groupCount = match.length;

            if (route instanceof RouterRouteSegment) {
                const restOfThePath = match[--groupCount];

                // Copy/paste... argh I hate that !
                if (route.getNamedParamsCount() !== 0) {
                    // set params
                    if (!namedParams) {
                        namedParams = new Map();
                    }

                    let group = 0;
                    route.namedParams.forEach((paramName) => {
                        const value = match[group++];
                        if (value) {
                            namedParams.set(paramName, value);
                        }
                    });
                }

                /* if (route.defaultRoute) {
                    if (restOfThePath.length !== 0) {
                        result = this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
                    }
                    if (!result) {
                        result = this._createRoute(completePath, lang, route.defaultRoute, undefined, 0, namedParams);
                    }
                } else {*/
                result = this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
                // }
            } else {
                result = this._createRoute(completePath, lang, route, match, groupCount, namedParams);
            }

            return true;
        });
        return result;
    }

    /**
     * Creates a new Route result
     *
     * @param {string} completePath
     * @param {string} lang
     * @param {RouterRoute} route
     * @param {Array} match
     * @param {int} groupCount
     * @param {Map} namedParams
     * @return {Route} route
     */
    _createRoute(completePath, lang, route, match, groupCount, namedParams) {
        let group = 0;
        let extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];

        let controller = route.controller;
        let action = route.action;

        let otherParams;

        if (route.getNamedParamsCount() !== 0) {
            // set params
            if (!namedParams) {
                namedParams = new Map();
            }

            route.namedParams.forEach((paramName) => {
                const value = match[group++];
                if (value) {
                    namedParams.set(paramName, value);
                }
            });

            if (!namedParams.size) {
                namedParams = undefined;
            }
        }

        if (namedParams) {
            // Replace controller and action if needed
            if (namedParams.has('controller')) {
                controller = this._routesTranslations.untranslate(namedParams.get('controller'), lang);
                // Should we remove it ?
                namedParams.delete('controller');
            }

            if (namedParams.has('action')) {
                action = this._routesTranslations.untranslate(namedParams.get('action'), lang);
                // Should we remove it ?
                namedParams.delete('action');
            }

            if (!namedParams.size) {
                namedParams = undefined;
            }
        }

        // The only not-named param can be /*
        if (group + 1 === groupCount && match[group]) {
            otherParams = match[group].split('/');
        }

        return new Route(
            route.key,
            completePath,
            controller,
            action,
            namedParams,
            otherParams,
            extension
        );
    }

    /**
     * Create a link
     *
     * @param {string} lang
     * @param {string} routeKey
     * @param {string} [params.extension]
     * @param {string} [params.queryString]
     * @param {string} [params.hash]
     * @return {string}
     */
    urlGenerator(lang, routeKey, params) {
        const route = this._routesMap.get(routeKey);
        if (process.env.NODE_ENV !== 'production') {
            if (!route) throw new Error(`Invalid routeKey: "${routeKey}"`);
        }
        try {
            return route.routes.get(lang).url(params);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
