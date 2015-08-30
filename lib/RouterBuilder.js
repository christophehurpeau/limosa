'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Map = require('babel-runtime/core-js/map').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _object2map = require('object2map');

var _object2map2 = _interopRequireDefault(_object2map);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

// import RouterRouteCommon from './RouterRoute/Common';

var _RouterRouteRoute = require('./RouterRoute/Route');

var _RouterRouteRoute2 = _interopRequireDefault(_RouterRouteRoute);

var _RouterRouteSegment = require('./RouterRoute/Segment');

var _RouterRouteSegment2 = _interopRequireDefault(_RouterRouteSegment);

var _RouterRouteLang = require('./RouterRoute/Lang');

var _RouterRouteLang2 = _interopRequireDefault(_RouterRouteLang);

var _UrlGeneratorUrlGenerator = require('./UrlGenerator/UrlGenerator');

var _UrlGeneratorUrlGenerator2 = _interopRequireDefault(_UrlGeneratorUrlGenerator);

var _UrlGeneratorUrlGeneratorNamedParamPart = require('./UrlGenerator/UrlGeneratorNamedParamPart');

var _UrlGeneratorUrlGeneratorNamedParamPart2 = _interopRequireDefault(_UrlGeneratorUrlGeneratorNamedParamPart);

var _UrlGeneratorUrlGeneratorOptionalGroupPart = require('./UrlGenerator/UrlGeneratorOptionalGroupPart');

var _UrlGeneratorUrlGeneratorOptionalGroupPart2 = _interopRequireDefault(_UrlGeneratorUrlGeneratorOptionalGroupPart);

var _UrlGeneratorUrlGeneratorPartArray = require('./UrlGenerator/UrlGeneratorPartArray');

var _UrlGeneratorUrlGeneratorPartArray2 = _interopRequireDefault(_UrlGeneratorUrlGeneratorPartArray);

var _UrlGeneratorUrlGeneratorStringPart = require('./UrlGenerator/UrlGeneratorStringPart');

var _UrlGeneratorUrlGeneratorStringPart2 = _interopRequireDefault(_UrlGeneratorUrlGeneratorStringPart);

// const regExpStartingSlash = /^\/+/;
// const regExpEndingSlash = /\/+$/;

/**
 * Build a route segment
 
* @class RouterBuilderSegment 
* @param builder 
* @param route 
* @param parent */

let RouterBuilderSegment = (function () {
    /**
     * @param {RouterBuilder} builder
     * @param {RouterRouteSegment} route
     * @param {RouterRouteSegment} [parent]
     */

    function RouterBuilderSegment(builder, route, parent) {
        _classCallCheck(this, RouterBuilderSegment);

        this.builder = builder;
        this.route = route;
        this.parent = parent;
    }

    /**
     * @class
     */

    /**
     * @param {String} routeKey
     * @param {String} routeUrl
     * @param {String} controllerAndActionSeparatedByDot
     * @param {Object} options namedParamsDefinition, routeLangs, extension
     
    * @memberof RouterBuilderSegment 
    * @instance 
    * @method add 
    * @param routeKey 
    * @param routeUrl 
    * @param controllerAndActionSeparatedByDot 
    * @param options */

    _createClass(RouterBuilderSegment, [{
        key: 'add',
        value: function add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
            const route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
            this.route.subRoutes.push(route);
            this.builder.router._addInternalRoute(routeKey, route);
            return this;
        }

        /**
         * @param {String} routeKey
         * @param {String} routeUrl
         * @param {String} controllerAndActionSeparatedByDot
         * @param {Object} options namedParamsDefinition, routeLangs, extension
         
        * @memberof RouterBuilderSegment 
        * @instance 
        * @method _createRoute 
        * @param routeKey 
        * @param routeUrl 
        * @param controllerAndActionSeparatedByDot 
        * @param options */
    }, {
        key: '_createRoute',
        value: function _createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
            return this.builder._createRoute(false, this.route, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
        }

        /**
         * @param {String} routeKey
         * @param {String} controllerAndActionSeparatedByDot
         * @param {Object} options namedParamsDefinition, routeLangs, extension
         
        * @memberof RouterBuilderSegment 
        * @instance 
        * @method defaultRoute 
        * @param routeKey 
        * @param controllerAndActionSeparatedByDot 
        * @param options */
    }, {
        key: 'defaultRoute',
        value: function defaultRoute(routeKey, controllerAndActionSeparatedByDot, options) {
            const route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
            // this.route.defaultRoute = route;
            // this.builder.router._addInternalRoute(routeKey, route);
            this.route.subRoutes.push(route);
            this.builder.router._addInternalRoute(routeKey, route);
            return this;
        }

        /**
         * @param {String} routeUrl
         * @param {Object} [options] namedParamsDefinition, routeLangs
         * @param {Function} buildSegment
         
        * @memberof RouterBuilderSegment 
        * @instance 
        * @method addSegment 
        * @param routeUrl 
        * @param options 
        * @param buildSegment */
    }, {
        key: 'addSegment',
        value: function addSegment(routeUrl, options, buildSegment) {
            if (typeof options === 'function') {
                buildSegment = options;
                options = {};
            }

            const route = this.builder._createRouteSegment(this.route, routeUrl, options.namedParamsDefinition, options.routeLangs);
            const segment = new RouterBuilderSegment(this.buider, route, this.route);
            buildSegment(segment);
            this.router.addRoute(null, route);
        }
    }]);

    return RouterBuilderSegment;
})();

/** @class RouterBuilder 
* @param routesTranslations 
* @param allLangs */
let RouterBuilder = (function () {
    /**
     * @constructs
     * @param {RoutesTranslations} routesTranslations
     * @param {Array} allLangs Array of all langs
     */

    function RouterBuilder(routesTranslations, allLangs) {
        _classCallCheck(this, RouterBuilder);

        this._routesTranslations = routesTranslations;
        this._allLangs = allLangs;
        this.router = new _Router2.default(routesTranslations);

        this.regExpNamedParam = /\$\{([a-zA-Z]+)}/g;
        this.translatableRoutePart = /\/([a-zA-Z_]+)/g;
        this.translatableRouteNamedParamValue = /^[a-zA-Z\|_]+$/g;
        this.regExpNamedParamOrOptionalPart = /(?:\$\{([a-zA-Z]+)})|(?:\[([^\]]+)\])/g;
    }

    /**
     * @param {String} lang
     * @param {String} string
     * @return {String}
     
    * @memberof RouterBuilder 
    * @instance 
    * @method translate 
    * @param lang 
    * @param string */

    _createClass(RouterBuilder, [{
        key: 'translate',
        value: function translate(lang, string) {
            const lstring = string.toLowerCase();
            const translation = this._routesTranslations.translate(lstring, lang);
            return translation;
        }

        /**
         * @param {Map} routes
         
        * @memberof RouterBuilder 
        * @instance 
        * @method fromMap 
        * @param routes */
    }, {
        key: 'fromMap',
        value: function fromMap(routes) {
            routes.forEach( /** @function 
                            * @param route 
                            * @param routeKey */function (route, routeKey) {
                this.add(routeKey, routeKey, route[0], {
                    namedParamsDefinition: route.length > 1 ? route[1] : undefined,
                    routeLangs: route.length > 2 ? route[2] || {} : {},
                    extension: route.length > 3 ? route[3] : undefined
                });
            });
        }

        /**
         * @param {String} routeKey
         * @param {String} routeUrl
         * @param {String} controllerAndActionSeparatedByDot
         * @param {Object} options namedParamsDefinition, routeLangs, extension
         
        * @memberof RouterBuilder 
        * @instance 
        * @method add 
        * @param routeKey 
        * @param routeUrl 
        * @param controllerAndActionSeparatedByDot 
        * @param options */
    }, {
        key: 'add',
        value: function add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
            const route = this._createRoute(false, undefined, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
            this.router.addRoute(routeKey, route);
            return this;
        }

        /**
         * @param {String} routeUrl
         * @param {Object} [options] namedParamsDefinition, routeLangs
         * @param {Function} buildSegment
         
        * @memberof RouterBuilder 
        * @instance 
        * @method addSegment 
        * @param routeUrl 
        * @param options 
        * @param buildSegment */
    }, {
        key: 'addSegment',
        value: function addSegment(routeUrl, options, buildSegment) {
            if (typeof options === 'function') {
                buildSegment = options;
                options = {};
            }

            const route = this._createRouteSegment(undefined, routeUrl, options.namedParamsDefinition, options.routeLangs);
            const segment = new RouterBuilderSegment(this, route, undefined);
            buildSegment(segment);
            this.router.addRoute(undefined, route);
            return this;
        }

        /**
         * @param {RouterRouteSegment} parent
         * @param {String} routeUrl
         * @param {Map} namedParamsDefinition
         * @param {Map} routeLangs
         * @return {_RouterRouteCommon}
         
        * @memberof RouterBuilder 
        * @instance 
        * @method _createRouteSegment 
        * @param parent 
        * @param routeUrl 
        * @param namedParamsDefinition 
        * @param routeLangs */
    }, {
        key: '_createRouteSegment',
        value: function _createRouteSegment(parent, routeUrl, namedParamsDefinition, routeLangs) {
            return this._createRoute(true, parent, routeUrl, undefined, namedParamsDefinition, routeLangs, undefined);
        }

        /**
         * @param {bool} segment
         * @param {RouterRouteSegment} parent
         * @param {String} routeUrl
         * @param {String} controllerAndActionSeparatedByDot
         * @param {Map} namedParamsDefinition
         * @param {Map} routeLangs
         * @param {String} extension
         * @return {_RouterRouteCommon}
         
        * @memberof RouterBuilder 
        * @instance 
        * @method _createRoute 
        * @param segment 
        * @param parent 
        * @param routeUrl 
        * @param controllerAndActionSeparatedByDot 
        * @param namedParamsDefinition 
        * @param routeLangs 
        * @param extension */
    }, {
        key: '_createRoute',
        value: function _createRoute(segment, parent, routeUrl, controllerAndActionSeparatedByDot, namedParamsDefinition, routeLangs, extension) {
            var _this = this;

            let controllerAndAction;
            if (!segment) {
                controllerAndAction = controllerAndActionSeparatedByDot.split('.');
                // assert(controllerAndAction.length == 2);
            }

            if (routeLangs == null) {
                routeLangs = new _Map();
            } else {
                routeLangs = (0, _object2map2.default)(routeLangs);
            }

            // -- Route langs --

            if (routeLangs.size !== 0) {
                this._allLangs.forEach(function (lang) {
                    if (!routeLangs.has(lang)) {
                        if (lang == 'en') {
                            routeLangs.set('en', routeUrl);
                        } else {
                            throw new Error('Missing lang ' + lang + '" for route "' + routeUrl + '"');
                        }
                    }
                });
            } else if (!routeUrl.match(this.translatableRoutePart)) {
                this._allLangs.forEach(function (lang) {
                    routeLangs.set(lang, routeUrl);
                });
            } else {
                this._allLangs.forEach(function (lang) {
                    routeLangs.set(lang, routeUrl.replace(_this.translatableRoutePart, function (str, p1) {
                        return '/' + _this.translate(lang, p1);
                    }));
                });
            }

            const paramNames = [];
            routeLangs.get(this._allLangs[0]).replace(this.regExpNamedParam, function (str, paramName) {
                paramNames.push(paramName);
            });
            // console.log(routeLangs[this._allLangs[0]], paramNames);

            const finalRoute = segment ? new _RouterRouteSegment2.default(paramNames) : new _RouterRouteRoute2.default(controllerAndAction[0], controllerAndAction[1], extension, paramNames);

            routeLangs.forEach(function (routeLang, lang) {
                const translate = _this.translate.bind(_this, lang);
                let specialEnd = false;
                let specialEnd2 = false;
                let routeLangRegExp;

                if (!segment && (specialEnd = routeLang.endsWith('/*'))) {
                    routeLangRegExp = routeLang.slice(0, -2);
                } else if (!segment && (specialEnd2 = routeLang.endsWith('/*]'))) {
                    routeLangRegExp = routeLang.slice(0, -3) + routeLang.slice(-1);
                } else {
                    routeLangRegExp = routeLang;
                }

                routeLangRegExp = routeLangRegExp.replace(/\//g, '\\/').replace(/\-/g, '\\-').replace(/\*/g, '(.*)').replace(/\[/g, '(').replace(/]/g, ')').replace(/\(/g, '(?:');

                if (specialEnd) {
                    routeLangRegExp = routeLangRegExp + '(?:\\/([^.]*))?';
                } else if (specialEnd2) {
                    // ends now is : /*)?
                    routeLangRegExp = routeLangRegExp.slice(0, -2) + '(?:\\/(.*))?' + routeLangRegExp.slice(-2);
                }

                const extensionRegExp = (function () {
                    if (segment || extension == null) {
                        return '';
                    }

                    if (extension == 'html') {
                        return '(?:\\.(html))?';
                    }

                    return '\\.(' + extension + ')';
                })();

                const replacedRegExp = routeLangRegExp.replace(_this.regExpNamedParam, function (str, paramName) {
                    if (namedParamsDefinition && namedParamsDefinition[paramName]) {
                        let paramDefVal = namedParamsDefinition[paramName];
                        if (typeof paramDefVal === 'string') {
                            if (paramDefVal.match(_this.translatableRouteNamedParamValue)) {
                                paramDefVal = paramDefVal.split('|').map(translate).join('|');
                            }
                        } else if (paramDefVal instanceof RegExp) {
                            paramDefVal = paramDefVal.source;
                        } else {
                            paramDefVal = paramDefVal[lang];
                        }

                        return paramDefVal == 'id' ? '([0-9]+)' : '(' + paramDefVal.replace('(', '(?:') + ')';
                    }

                    if (paramName === 'id') {
                        return '([0-9]+)';
                    }

                    return '([^\\/.]+)';
                });

                if (!segment && specialEnd) {
                    routeLang = routeLang.slice(0, -2);
                } else if (!segment && specialEnd2) {
                    routeLang = routeLang.slice(0, -3) + routeLang.slice(-1);
                }

                const regExpNamedParamOrOptionalPart = _this.regExpNamedParamOrOptionalPart;
                const parts = routeLang.length === 0 ? null : ( /** @function 
                                                                * @param routeLangPart */function buildParts(routeLangPart) {
                    const parts = [];
                    let index = 0;
                    routeLangPart.replace(regExpNamedParamOrOptionalPart, function (match, paramName, optionalGroup, offset) {
                        if (offset > index) {
                            parts.push(new _UrlGeneratorUrlGeneratorStringPart2.default(routeLang.substring(index, offset)));
                        }

                        index = offset + match.length;

                        if (optionalGroup) {
                            const optionalGroupParts = buildParts(optionalGroup);
                            parts.push(new _UrlGeneratorUrlGeneratorOptionalGroupPart2.default(optionalGroupParts));
                        } else {
                            parts.push(new _UrlGeneratorUrlGeneratorNamedParamPart2.default(paramName, translate));
                        }

                        return match;
                    });

                    if (index < routeLangPart.length) {
                        parts.push(new _UrlGeneratorUrlGeneratorStringPart2.default(routeLang.substring(index)));
                    }

                    if (parts.length === 0) {
                        throw new Error(routeLangPart);
                    }

                    return new _UrlGeneratorUrlGeneratorPartArray2.default(parts);
                })(routeLang);

                let urlGeneratorParts;
                if (parent != null) {
                    const parentParts = parent.routes.get(lang).urlGenerator.parts;
                    const mergedParts = parts === null ? parentParts : new _UrlGeneratorUrlGeneratorPartArray2.default([parentParts, parts]);
                    urlGeneratorParts = new _UrlGeneratorUrlGenerator2.default(mergedParts, extension);
                } else {
                    urlGeneratorParts = new _UrlGeneratorUrlGenerator2.default(parts, extension);
                }

                finalRoute.set(lang, new _RouterRouteLang2.default(new RegExp('^' + replacedRegExp + extensionRegExp + (segment ? '(.*)$' : '$')), urlGeneratorParts));
            });

            return finalRoute;
        }

        /**
         * Add default routes
         
        * @memberof RouterBuilder 
        * @instance 
        * @method addDefaultRoutes */
    }, {
        key: 'addDefaultRoutes',
        value: function addDefaultRoutes() {
            this.addSegment('/${controller}', { extension: 'html' }, function (segment) {
                segment.add('default', '/${action}/*', 'site.index', { extension: 'html' }).defaultRoute('defaultSimple', 'site.index', { extension: 'html' });
            });

            return this;
        }
    }]);

    return RouterBuilder;
})();

exports.default = RouterBuilder;
module.exports = exports.default;
//# sourceMappingURL=RouterBuilder.js.map