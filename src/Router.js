import RouterRoute from './RouterRoute/Route';
import RouterRouteSegment from './RouterRoute/Segment';
import Route from './Route';

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
     * @param {String} key
     * @return {Route}
     */
    get(key) {
        return this._routesMap.get(key);
    }

    /**
     * @param {String} routeKey
     * @param {RouterRouteCommon} route
     */
    addRoute(routeKey, route) {
        if (route instanceof RouterRoute) {
            this._addInternalRoute(routeKey, route);
        }

        this._routes.push(route);
    }

    /**
     * @param {String} routeKey
     * @param {RouterRoute} route
     */
    _addInternalRoute(routeKey, route) {
        this._routesMap.set(routeKey, route);
    }

    /**
     * @param {String} path
     * @param {String=} lang
     * @return {Route}
     */
    find(path, lang = 'en') {
        path = '/' + path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash, '');
        return this._findRoute(this._routes, path, path, lang);
    }

    /**
     * @param {Array} routes
     * @param {String} completePath
     * @param {String} path
     * @param {String} lang
     * @param {Map} namedParams
     * @return {RouterRoute} route the route or undefined if none found
     */
    _findRoute(routes, completePath, path, lang, namedParams) {
        let result;
        routes.some((route, index) => {
            /* RouterRouteLang */
            let routeLang = route.get(lang);
            if (!routeLang) {
                throw new Error('Cannot find routeLang for lang ' + lang + ' and route ' + index);
            }

            if (this.logger) {
                this.logger.info('[springbokjs-router] trying ' + routeLang.regExp);
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
     * @param {String} completePath
     * @param {String} lang
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

        return new Route(completePath, controller, action, namedParams, otherParams, extension);
    }

    /**
     * Create a link
     *
     * @param {String} lang
     * @param {String} routeKey
     * @param {Object} [params]
     * @param {String} [params.extension]
     * @param {String} [params.queryString]
     * @param {String} [params.hash]
     * @return {String}
     */
    urlGenerator(lang, routeKey, params) {
        const route = this._routesMap[routeKey];
        return route.routes[lang].url(params);
    }
}
