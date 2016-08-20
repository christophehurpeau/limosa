'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Route = require('./RouterRoute/Route');

var _Route2 = _interopRequireDefault(_Route);

var _Segment = require('./RouterRoute/Segment');

var _Segment2 = _interopRequireDefault(_Segment);

var _Route3 = require('./Route');

var _Route4 = _interopRequireDefault(_Route3);

var _Common = require('./RouterRoute/Common');

var _Common2 = _interopRequireDefault(_Common);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const regExpStartingSlash = /^\/+/;
const regExpEndingSlash = /\/+$/;

let Router = class Router {
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
    * @returns {*}
    */
    get(key) {
        return this._routesMap.get(key);
    }

    /**
     * @param {string} routeKey
     * @param {RouterRouteCommon} route
    */
    addRoute(routeKey, route) {
        if (route instanceof _Route2.default) {
            this._addInternalRoute(routeKey, route);
        }

        this._routes.push(route);
    }

    /**
     * @param {string} routeKey
     * @param {RouterRoute} route
    */
    _addInternalRoute(routeKey, route) {
        if (this._routesMap.has(routeKey)) {
            throw new Error(`duplicate routeKey: "${ routeKey }"`);
        }
        this._routesMap.set(routeKey, route);
    }

    /**
     * @param {string} path
     * @param {string=} lang
     * @return {Route}
    * @returns {Route}
    */
    find(path) {
        let lang = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];

        path = `/${ path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash, '') }`;
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
                throw new Error(`Cannot find routeLang for lang ${ lang } and route ${ index }`);
            }

            // console.log(`[springbokjs-router] trying ${routeLang.regExp}`);
            if (this.logger) {
                this.logger.info(`[springbokjs-router] trying ${ routeLang.regExp }`);
            }

            const match = routeLang.match(path);
            if (!match) {
                return false;
            }
            // console.log(match);

            match.shift(); // remove m[0];
            let groupCount = match.length;

            if (route instanceof _Segment2.default) {
                const restOfThePath = match[--groupCount];

                // Copy/paste... argh I hate that !
                if (route.getNamedParamsCount() !== 0) {
                    // set params
                    if (!namedParams) {
                        namedParams = new Map();
                    }

                    let group = 0;
                    route.namedParams.forEach(paramName => {
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

            route.namedParams.forEach(paramName => {
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

        return new _Route4.default(completePath, controller, action, namedParams, otherParams, extension);
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
    * @param params
    */
    urlGenerator(lang, routeKey, params) {
        const route = this._routesMap.get(routeKey);
        if (process.env.NODE_ENV !== 'production') {
            if (!route) throw new Error(`Invalid routeKey: "${ routeKey }"`);
        }
        try {
            return route.routes.get(lang).url(params);
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
exports.default = Router;
//# sourceMappingURL=Router.js.map