require('springbokjs-shim/es6');
var S = require('springbokjs-utils');

var RouterRoute = require('./router_route/route');
var RouterRouteSegment = require('./router_route/segment');
var Route = require('./route');

var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;

/**
 * Creates a new Router
 * 
 * @class Router Represents a Router
 */
var Router = S.newClass();
module.exports = Router;

Router.extendPrototype(/** @lends Router.prototype */{
    /**
     * Creates a new Router
     * 
     * @constructs
     * @param {RoutesTranslations} routesTranslations
     */
    construct(routesTranslations) {
        this._routesMap = new Map();
        this._routes = [];
        this._routesTranslations = routesTranslations;
    },

    /**
     * Get a Route by its key
     * 
     * @param {String} key
     * @return {Route}
     */
    get(key) {
        return this._routesMap.get(key);
    },


    /**
     * @param {String} routeKey
     * @param {RouterRouteCommon} route
     */
    addRoute(routeKey, route) {
        if (route instanceof RouterRoute) {
            this._addInternalRoute(routeKey, route);
        }
        this._routes.push(route);
    },

    /**
     * @param {String} routeKey
     * @param {RouterRoute} route
     */
    _addInternalRoute(routeKey, route) {
        this._routesMap.set(routeKey, route);
    },

    /**
     * @param {String} path
     * @param {String=} lang
     * @return {Route}
     */
    find(path, lang = 'en') {
        path = '/' + path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash,'');
        return this._findRoute(this._routes, path, path, lang);
    },

    /**
     * @param {Array} routes
     * @param {String} completePath
     * @param {String} path
     * @param {String} lang
     * @param {Map} namedParams
     * @return {RouterRoute} route the route or undefined if none found
     */
    _findRoute(routes, completePath, path, lang, namedParams) {
        var result;
        routes.some((route) => {
            var /*RouterRouteLang*/ routeLang = route.get(lang);
            if (!routeLang) {
                throw new Error();
            }
            console.info('[springbokjs-router] trying ' + routeLang.regExp);

            var match = routeLang.match(path);
            if (!match) {
                return false;
            }
            //console.log(match);

            match.shift(); // remove m[0];
            var groupCount = match.length;

            if (route instanceof RouterRouteSegment) {
                var restOfThePath = match[--groupCount];

                //Copy/paste... argh I hate that !
                if (route.getNamedParamsCount() !== 0) {
                    // set params
                    if (!namedParams) {
                        namedParams = new Map();
                    }

                    var group = 0;
                    route.namedParams.forEach((paramName) => {
                        var value = match[group++];
                        if (value) {
                            namedParams.set(paramName, value);
                        }
                    });
                }

                /*if (route.defaultRoute) {
                    if (restOfThePath.length !== 0) {
                        result = this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
                    }
                    if (!result) {
                        result = this._createRoute(completePath, lang, route.defaultRoute, undefined, 0, namedParams);
                    }
                } else {*/
                    result = this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
                //}
            } else {
                result = this._createRoute(completePath, lang, route, match, groupCount, namedParams);
            }
            return true;
        });
        return result;
    },
    
    /**
     * Creates a new Route result
     * @param {String} completePath
     * @param {String} lang
     * @param {RouterRoute} route
     * @param {int} groupCount
     * @param {Map} namedParams
     * @return {Route} route
     */
    _createRoute(completePath, lang, route, match, groupCount, namedParams) {
        var group = 0;
        var extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];

        var controller = route.controller, action = route.action;

        var otherParams;

        if (route.getNamedParamsCount() !== 0) {
            // set params
            if (!namedParams) {
                namedParams = new Map();
            }

            route.namedParams.forEach((paramName) => {
                var value = match[group++];
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
                controller = controller[0].toUpperCase() + controller.substring(1);
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
        if (group+1 === groupCount && match[group]) {
            otherParams = match[group].split('/');
        }

        return new Route(completePath, controller, action, namedParams, otherParams, extension);
    },

    /**
     * Create a link
     *
     * @param {String} lang
     * @param {String} routeKey
     * @param {Array} params
     * @param {String} extension
     * @param {String} query
     * @param {String} hash
     * @return {String}
     */
    createLink(lang, routeKey, params, extension, query, hash) {
        var route = this._routesMap[routeKey];
        var plus = '';
        if (extension) {
            plus = '.' + extension;
        } else if (route.extension) {
            plus = '.' + route.extension;
        }

        var link = route.routes[lang].strf;
        link = S.string.vformat(link, params.map((param) => { this._routesTranslations.translate(param, lang); }));
        return (link === '/' ? link : link.replace(regExpEndingSlash, '')) + plus;
    }
});
