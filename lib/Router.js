"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var S = require("springbokjs-utils");

var RouterRoute = _interopRequire(require("./RouterRoute/Route"));

var RouterRouteSegment = _interopRequire(require("./RouterRoute/Segment"));

var Route = _interopRequire(require("./Route"));

var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;

/**
 * Creates a new Router
 *
 * @class Router
 */
var Router = (function () {
    /**
     * Creates a new Router
     *
     * @constructs Router
     * @param {RoutesTranslations} routesTranslations
     */
    function Router(routesTranslations) {
        _classCallCheck(this, Router);

        this._routesMap = new Map();
        this._routes = [];
        this._routesTranslations = routesTranslations;
    }

    _prototypeProperties(Router, null, {
        get: {

            /**
             * Get a Route by its key
             *
             * @param {String} key
             * @return {Route}
             */
            value: function get(key) {
                return this._routesMap.get(key);
            },
            writable: true,
            configurable: true
        },
        addRoute: {


            /**
             * @param {String} routeKey
             * @param {RouterRouteCommon} route
             */
            value: function addRoute(routeKey, route) {
                if (route instanceof RouterRoute) {
                    this._addInternalRoute(routeKey, route);
                }
                this._routes.push(route);
            },
            writable: true,
            configurable: true
        },
        _addInternalRoute: {

            /**
             * @param {String} routeKey
             * @param {RouterRoute} route
             */
            value: function _addInternalRoute(routeKey, route) {
                this._routesMap.set(routeKey, route);
            },
            writable: true,
            configurable: true
        },
        find: {

            /**
             * @param {String} path
             * @param {String=} lang
             * @return {Route}
             */
            value: function find(path) {
                var lang = arguments[1] === undefined ? "en" : arguments[1];
                path = "/" + path.trim().replace(regExpStartingSlash, "").replace(regExpEndingSlash, "");
                return this._findRoute(this._routes, path, path, lang);
            },
            writable: true,
            configurable: true
        },
        _findRoute: {

            /**
             * @param {Array} routes
             * @param {String} completePath
             * @param {String} path
             * @param {String} lang
             * @param {Map} namedParams
             * @return {RouterRoute} route the route or undefined if none found
             */
            value: function _findRoute(routes, completePath, path, lang, namedParams) {
                var _this = this;
                var result;
                routes.some(function (route, index) {
                    var /*RouterRouteLang*/routeLang = route.get(lang);
                    if (!routeLang) {
                        throw new Error("Cannot find routeLang for lang " + lang + " and route " + index);
                    }
                    if (_this.logger) {
                        _this.logger.info("[springbokjs-router] trying " + routeLang.regExp);
                    }

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
                            route.namedParams.forEach(function (paramName) {
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
                        result = _this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
                        //}
                    } else {
                        result = _this._createRoute(completePath, lang, route, match, groupCount, namedParams);
                    }
                    return true;
                });
                return result;
            },
            writable: true,
            configurable: true
        },
        _createRoute: {

            /**
             * Creates a new Route result
             * @param {String} completePath
             * @param {String} lang
             * @param {RouterRoute} route
             * @param {int} groupCount
             * @param {Map} namedParams
             * @return {Route} route
             */
            value: function _createRoute(completePath, lang, route, match, groupCount, namedParams) {
                var group = 0;
                var extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];

                var controller = route.controller,
                    action = route.action;

                var otherParams;

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
                    if (namedParams.has("controller")) {
                        controller = this._routesTranslations.untranslate(namedParams.get("controller"), lang);
                        // Should we remove it ?
                        namedParams["delete"]("controller");
                    }
                    if (namedParams.has("action")) {
                        action = this._routesTranslations.untranslate(namedParams.get("action"), lang);
                        // Should we remove it ?
                        namedParams["delete"]("action");
                    }

                    if (!namedParams.size) {
                        namedParams = undefined;
                    }
                }

                // The only not-named param can be /*
                if (group + 1 === groupCount && match[group]) {
                    otherParams = match[group].split("/");
                }

                return new Route(completePath, controller, action, namedParams, otherParams, extension);
            },
            writable: true,
            configurable: true
        },
        createLink: {

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
            value: function createLink(lang, routeKey, params, extension, query, hash) {
                var _this = this;
                var route = this._routesMap[routeKey];
                var plus = "";
                if (extension) {
                    plus = "." + extension;
                } else if (route.extension) {
                    plus = "." + route.extension;
                }

                var link = route.routes[lang].strf;
                link = S.string.vformat(link, params.map(function (param) {
                    _this._routesTranslations.translate(param, lang);
                }));
                return (link === "/" ? link : link.replace(regExpEndingSlash, "")) + plus;
            },
            writable: true,
            configurable: true
        }
    });

    return Router;
})();

module.exports = Router;
//# sourceMappingURL=Router.js.map