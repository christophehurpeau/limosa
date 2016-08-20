'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

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

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;

var Router = /**
              * @function
             */function () {
    /**
     * @param {RoutesTranslations} routesTranslations
    * @function
    */

    function Router(routesTranslations) {
        _classCallCheck(this, Router);

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


    _createClass(Router, [{
        key: 'get',
        value: /**
                * @function
                * @param {string} key
               */function get(key) {
            return this._routesMap.get(key);
        }

        /**
         * @param {string} routeKey
         * @param {RouterRouteCommon} route
         */

    }, {
        key: 'addRoute',
        value: /**
                * @function
                * @param {string} routeKey
                * @param {RouterRouteCommon} route
               */function addRoute(routeKey, route) {
            if (route instanceof _Route2.default) {
                this._addInternalRoute(routeKey, route);
            }

            this._routes.push(route);
        }

        /**
         * @param {string} routeKey
         * @param {RouterRoute} route
         */

    }, {
        key: '_addInternalRoute',
        value: /**
                * @function
                * @param {string} routeKey
                * @param {RouterRoute} route
               */function _addInternalRoute(routeKey, route) {
            if (this._routesMap.has(routeKey)) {
                throw new Error('duplicate routeKey: "' + routeKey + '"');
            }
            this._routesMap.set(routeKey, route);
        }

        /**
         * @param {string} path
         * @param {string=} lang
         * @return {Route}
         */

    }, {
        key: 'find',
        value: /**
                * @function
                * @param {string} path
                * @param {string} [lang=en]
               */function find(path) {
            var lang = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];

            path = '/' + path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash, '');
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

    }, {
        key: '_findRoute',
        value: /**
                * @function
                * @param routes
                * @param completePath
                * @param path
                * @param lang
                * @param namedParams
               */function _findRoute(routes, completePath, path, lang, namedParams) {
            var _this = this;

            var result = void 0;
            routes.some(function (route, index) {
                /* RouterRouteLang */
                var routeLang = route.get(lang);
                if (!routeLang) {
                    throw new Error('Cannot find routeLang for lang ' + lang + ' and route ' + index);
                }

                // console.log(`[springbokjs-router] trying ${routeLang.regExp}`);
                if (_this.logger) {
                    _this.logger.info('[springbokjs-router] trying ' + routeLang.regExp);
                }

                var match = routeLang.match(path);
                if (!match) {
                    return false;
                }
                // console.log(match);

                match.shift(); // remove m[0];
                var groupCount = match.length;

                if (route instanceof _Segment2.default) {
                    var restOfThePath = match[--groupCount];

                    // Copy/paste... argh I hate that !
                    if (route.getNamedParamsCount() !== 0) {
                        ( /**
                           * @function
                          */function () {
                            // set params
                            if (!namedParams) {
                                namedParams = new Map();
                            }

                            var group = 0;
                            route.namedParams.forEach(function (paramName) {
                                var value = match[group++];
                                if (value) {
                                    namedParams.set(paramName, value);
                                }
                            });
                        })();
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
         * @param {string} completePath
         * @param {string} lang
         * @param {RouterRoute} route
         * @param {Array} match
         * @param {int} groupCount
         * @param {Map} namedParams
         * @return {Route} route
         */

    }, {
        key: '_createRoute',
        value: /**
                * @function
                * @param completePath
                * @param lang
                * @param route
                * @param match
                * @param groupCount
                * @param namedParams
               */function _createRoute(completePath, lang, route, match, groupCount, namedParams) {
            var group = 0;
            var extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];

            var controller = route.controller;
            var action = route.action;

            var otherParams = void 0;

            if (route.getNamedParamsCount() !== 0) {
                // set params
                if (!namedParams) {
                    namedParams = new Map();
                }

                route.namedParams.forEach(function (paramName) {
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
         */

    }, {
        key: 'urlGenerator',
        value: /**
                * @function
                * @param lang
                * @param routeKey
                * @param params
               */function urlGenerator(lang, routeKey, params) {
            var route = this._routesMap.get(routeKey);
            if (process.env.NODE_ENV !== 'production') {
                if (!route) throw new Error('Invalid routeKey: "' + routeKey + '"');
            }
            try {
                return route.routes.get(lang).url(params);
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }]);

    return Router;
}();

exports.default = Router;
//# sourceMappingURL=Router.js.map