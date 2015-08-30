'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Map = require('babel-runtime/core-js/map').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _RouterRouteRoute = require('./RouterRoute/Route');

var _RouterRouteRoute2 = _interopRequireDefault(_RouterRouteRoute);

var _RouterRouteSegment = require('./RouterRoute/Segment');

var _RouterRouteSegment2 = _interopRequireDefault(_RouterRouteSegment);

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

const regExpStartingSlash = /^\/+/;
const regExpEndingSlash = /\/+$/;

/** @class Router 
* @param routesTranslations */
let Router = (function () {
    /**
     * @param {RoutesTranslations} routesTranslations
     */

    function Router(routesTranslations) {
        _classCallCheck(this, Router);

        this._routesMap = new _Map();
        this._routes = [];
        this._routesTranslations = routesTranslations;
    }

    /**
     * Get a Route by its key
     *
     * @param {String} key
     * @return {Route}
     
    * @memberof Router 
    * @instance 
    * @method get 
    * @param key */

    _createClass(Router, [{
        key: 'get',
        value: function get(key) {
            return this._routesMap.get(key);
        }

        /**
         * @param {String} routeKey
         * @param {RouterRouteCommon} route
         
        * @memberof Router 
        * @instance 
        * @method addRoute 
        * @param routeKey 
        * @param route */
    }, {
        key: 'addRoute',
        value: function addRoute(routeKey, route) {
            if (route instanceof _RouterRouteRoute2.default) {
                this._addInternalRoute(routeKey, route);
            }

            this._routes.push(route);
        }

        /**
         * @param {String} routeKey
         * @param {RouterRoute} route
         
        * @memberof Router 
        * @instance 
        * @method _addInternalRoute 
        * @param routeKey 
        * @param route */
    }, {
        key: '_addInternalRoute',
        value: function _addInternalRoute(routeKey, route) {
            this._routesMap.set(routeKey, route);
        }

        /**
         * @param {String} path
         * @param {String=} lang
         * @return {Route}
         
        * @memberof Router 
        * @instance 
        * @method find 
        * @param path 
        * @param [lang=en] */
    }, {
        key: 'find',
        value: function find(path) {
            let lang = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];

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
         
        * @memberof Router 
        * @instance 
        * @method _findRoute 
        * @param routes 
        * @param completePath 
        * @param path 
        * @param lang 
        * @param namedParams */
    }, {
        key: '_findRoute',
        value: function _findRoute(routes, completePath, path, lang, namedParams) {
            var _this = this;

            let result;
            routes.some(function (route, index) {
                /* RouterRouteLang */
                let routeLang = route.get(lang);
                if (!routeLang) {
                    throw new Error('Cannot find routeLang for lang ' + lang + ' and route ' + index);
                }

                if (_this.logger) {
                    _this.logger.info('[springbokjs-router] trying ' + routeLang.regExp);
                }

                const match = routeLang.match(path);
                if (!match) {
                    return false;
                }
                // console.log(match);

                match.shift(); // remove m[0];
                let groupCount = match.length;

                if (route instanceof _RouterRouteSegment2.default) {
                    const restOfThePath = match[--groupCount];

                    // Copy/paste... argh I hate that !
                    if (route.getNamedParamsCount() !== 0) {
                        // set params
                        if (!namedParams) {
                            namedParams = new _Map();
                        }

                        let group = 0;
                        route.namedParams.forEach(function (paramName) {
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
                    result = _this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
                    // }
                } else {
                        result = _this._createRoute(completePath, lang, route, match, groupCount, namedParams);
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
         
        * @memberof Router 
        * @instance 
        * @method _createRoute 
        * @param completePath 
        * @param lang 
        * @param route 
        * @param match 
        * @param groupCount 
        * @param namedParams */
    }, {
        key: '_createRoute',
        value: function _createRoute(completePath, lang, route, match, groupCount, namedParams) {
            let group = 0;
            let extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];

            let controller = route.controller;
            let action = route.action;

            let otherParams;

            if (route.getNamedParamsCount() !== 0) {
                // set params
                if (!namedParams) {
                    namedParams = new _Map();
                }

                route.namedParams.forEach(function (paramName) {
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

            return new _Route2.default(completePath, controller, action, namedParams, otherParams, extension);
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
         
        * @memberof Router 
        * @instance 
        * @method urlGenerator 
        * @param lang 
        * @param routeKey 
        * @param params */
    }, {
        key: 'urlGenerator',
        value: function urlGenerator(lang, routeKey, params) {
            const route = this._routesMap[routeKey];
            return route.routes[lang].url(params);
        }
    }]);

    return Router;
})();

exports.default = Router;
module.exports = exports.default;
//# sourceMappingURL=Router.js.map