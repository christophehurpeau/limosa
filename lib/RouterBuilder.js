'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _object2map = require('object2map');

var _object2map2 = _interopRequireDefault(_object2map);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('./RouterRoute/Route');

var _Route2 = _interopRequireDefault(_Route);

var _Segment = require('./RouterRoute/Segment');

var _Segment2 = _interopRequireDefault(_Segment);

var _Lang = require('./RouterRoute/Lang');

var _Lang2 = _interopRequireDefault(_Lang);

var _UrlGenerator = require('./UrlGenerator/UrlGenerator');

var _UrlGenerator2 = _interopRequireDefault(_UrlGenerator);

var _UrlGeneratorNamedParamPart = require('./UrlGenerator/UrlGeneratorNamedParamPart');

var _UrlGeneratorNamedParamPart2 = _interopRequireDefault(_UrlGeneratorNamedParamPart);

var _UrlGeneratorOptionalGroupPart = require('./UrlGenerator/UrlGeneratorOptionalGroupPart');

var _UrlGeneratorOptionalGroupPart2 = _interopRequireDefault(_UrlGeneratorOptionalGroupPart);

var _UrlGeneratorPartArray = require('./UrlGenerator/UrlGeneratorPartArray');

var _UrlGeneratorPartArray2 = _interopRequireDefault(_UrlGeneratorPartArray);

var _UrlGeneratorStringPart = require('./UrlGenerator/UrlGeneratorStringPart');

var _UrlGeneratorStringPart2 = _interopRequireDefault(_UrlGeneratorStringPart);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const regExpStartingSlash = /^\/+/;
// const regExpEndingSlash = /\/+$/;

/**
 * Build a route segment
 */

// import RouterRouteCommon from './RouterRoute/Common';
let RouterBuilderSegment = class RouterBuilderSegment {
    /**
     * @param {RouterBuilder} builder
     * @param {RouterRouteSegment} route
     * @param {RouterRouteSegment} [parent]
    */
    constructor(builder, route, parent) {
        this.builder = builder;
        this.route = route;
        this.parent = parent;
    }

    /**
     * @param {string} routeKey
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
    * @param options
    */
    add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
    }

    /**
     * @param {string} routeKey
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
    * @param options
    */
    _createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        return this.builder._createRoute(false, this.route, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
    }

    /**
     * @param {string} routeKey
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
    * @param options
    */
    defaultRoute(routeKey, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
        // this.route.defaultRoute = route;
        // this.builder.router._addInternalRoute(routeKey, route);
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
    }

    /**
     * @param {string} routeUrl
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {Function} buildSegment
    * @param options
    */
    addSegment(routeUrl, options, buildSegment) {
        if (typeof options === 'function') {
            buildSegment = options;
            options = {};
        }

        const route = this.builder._createRouteSegment(this.route, routeUrl, options.namedParamsDefinition, options.routeLangs);
        const segment = new RouterBuilderSegment(this.buider, route, this.route);
        buildSegment(segment);
        this.router.addRoute(null, route);
    }
};
let RouterBuilder = class RouterBuilder {
    /**
     * @param {RoutesTranslations} routesTranslations
     * @param {Array} allLangs Array of all langs
    */
    constructor(routesTranslations, allLangs) {
        this._routesTranslations = routesTranslations;
        this._allLangs = allLangs;
        this.router = new _Router2.default(routesTranslations);

        this.regExpNamedParam = /\$\{([a-zA-Z]+)}/g;
        this.translatableRoutePart = /\/([a-zA-Z_]+)/g;
        this.translatableRouteNamedParamValue = /^[a-zA-Z\|_]+$/g;
        this.regExpNamedParamOrOptionalPart = /(?:\$\{([a-zA-Z]+)})|(?:\[([^\]]+)\])/g;
    }

    /**
     * @param {string} lang
     * @param {string} string
     * @return {string}
    */
    translate(lang, string) {
        const lstring = string.toLowerCase();
        const translation = this._routesTranslations.translate(lstring, lang);
        return translation;
    }

    /**
     * @param {Map} routes
    */
    fromMap(routes) {
        routes.forEach((route, routeKey) => {
            this.add(routeKey, routeKey, route[0], {
                namedParamsDefinition: route.length > 1 ? route[1] : undefined,
                routeLangs: route.length > 2 ? route[2] || {} : {},
                extension: route.length > 3 ? route[3] : undefined
            });
        });
    }

    /**
     * @param {string} routeKey
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
    * @param options
    */
    add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(false, undefined, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
        this.router.addRoute(routeKey, route);
        return this;
    }

    /**
     * @param {string} routeUrl
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {Function} buildSegment
    * @param options
    */
    addSegment(routeUrl, options, buildSegment) {
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
     * @param {string} routeUrl
     * @param {Map} namedParamsDefinition
     * @param {Map} routeLangs
     * @return {RouterRouteCommon}
    */
    _createRouteSegment(parent, routeUrl, namedParamsDefinition, routeLangs) {
        return this._createRoute(true, parent, routeUrl, undefined, namedParamsDefinition, routeLangs, undefined);
    }

    /**
     * @param {boolean} segment
     * @param {RouterRouteSegment} parent
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} namedParamsDefinition
     * @param {Map} routeLangs
     * @param {string} extension
     * @return {RouterRouteCommon}
    */
    _createRoute(segment, parent, routeUrl, controllerAndActionSeparatedByDot, namedParamsDefinition, routeLangs, extension) {
        let controllerAndAction;
        if (!segment) {
            controllerAndAction = controllerAndActionSeparatedByDot.split('.');
            // assert(controllerAndAction.length == 2);
        }

        if (routeLangs == null) {
            routeLangs = new Map();
        } else {
            routeLangs = (0, _object2map2.default)(routeLangs);
        }

        // -- Route langs --

        if (routeLangs.size !== 0) {
            this._allLangs.forEach(lang => {
                if (!routeLangs.has(lang)) {
                    if (lang == 'en') {
                        routeLangs.set('en', routeUrl);
                    } else {
                        throw new Error(`Missing lang ${ lang }" for route "${ routeUrl }"`);
                    }
                }
            });
        } else if (!routeUrl.match(this.translatableRoutePart)) {
            this._allLangs.forEach(lang => {
                routeLangs.set(lang, routeUrl);
            });
        } else {
            this._allLangs.forEach(lang => {
                routeLangs.set(lang, routeUrl.replace(this.translatableRoutePart, (str, p1) => `/${ this.translate(lang, p1) }`));
            });
        }

        const paramNames = [];
        routeLangs.get(this._allLangs[0]).replace(this.regExpNamedParam, (str, paramName) => {
            paramNames.push(paramName);
        });
        // console.log(routeLangs[this._allLangs[0]], paramNames);

        const finalRoute = segment ? new _Segment2.default(paramNames) : new _Route2.default(controllerAndAction[0], controllerAndAction[1], extension, paramNames);

        routeLangs.forEach((routeLang, lang) => {
            const translate = this.translate.bind(this, lang);
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
                routeLangRegExp = `${ routeLangRegExp }(?:\\/([^.]*))?`;
            } else if (specialEnd2) {
                // ends now is : /*)?
                routeLangRegExp = `${ routeLangRegExp.slice(0, -2) }(?:\\/(.*))?${ routeLangRegExp.slice(-2) }`;
            }

            const extensionRegExp = (() => {
                if (segment || extension == null) {
                    return '';
                }

                if (extension == 'html') {
                    return '(?:\\.(html))?';
                }

                return `\\.(${ extension })`;
            })();

            const replacedRegExp = routeLangRegExp.replace(this.regExpNamedParam, (str, paramName) => {
                if (namedParamsDefinition && namedParamsDefinition[paramName]) {
                    let paramDefVal = namedParamsDefinition[paramName];
                    if (typeof paramDefVal === 'string') {
                        if (paramDefVal.match(this.translatableRouteNamedParamValue)) {
                            paramDefVal = paramDefVal.split('|').map(translate).join('|');
                        }
                    } else if (paramDefVal instanceof RegExp) {
                        paramDefVal = paramDefVal.source;
                    } else {
                        paramDefVal = paramDefVal[lang];
                    }

                    return paramDefVal == 'id' ? '([0-9]+)' : `(${ paramDefVal.replace('(', '(?:') })`;
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

            const regExpNamedParamOrOptionalPart = this.regExpNamedParamOrOptionalPart;
            const parts = routeLang.length === 0 ? null : /**
                                                           * @function
                                                           * @param routeLangPart
                                                          */function buildParts(routeLangPart) {
                const parts = [];
                let index = 0;
                routeLangPart.replace(regExpNamedParamOrOptionalPart, (match, paramName, optionalGroup, offset) => {
                    if (offset > index) {
                        parts.push(new _UrlGeneratorStringPart2.default(routeLang.substring(index, offset)));
                    }

                    index = offset + match.length;

                    if (optionalGroup) {
                        const optionalGroupParts = buildParts(optionalGroup);
                        parts.push(new _UrlGeneratorOptionalGroupPart2.default(optionalGroupParts));
                    } else {
                        parts.push(new _UrlGeneratorNamedParamPart2.default(paramName, translate));
                    }

                    return match;
                });

                if (index < routeLangPart.length) {
                    parts.push(new _UrlGeneratorStringPart2.default(routeLang.substring(index)));
                }

                if (parts.length === 0) {
                    throw new Error(routeLangPart);
                }

                return new _UrlGeneratorPartArray2.default(parts);
            }(routeLang);

            let urlGeneratorParts;
            if (parent != null) {
                const parentParts = parent.routes.get(lang).urlGenerator.parts;
                const mergedParts = parts === null ? parentParts : new _UrlGeneratorPartArray2.default([parentParts, parts]);
                urlGeneratorParts = new _UrlGenerator2.default(mergedParts, extension);
            } else {
                urlGeneratorParts = new _UrlGenerator2.default(parts, extension);
            }

            finalRoute.set(lang, new _Lang2.default(new RegExp(`^${ replacedRegExp }${ extensionRegExp }${ segment ? '(.*)$' : '$' }`), urlGeneratorParts));
        });

        return finalRoute;
    }

    /**
     * Add default routes
     */
    addDefaultRoutes() {
        this.addSegment('/${controller}', { extension: 'html' }, segment => {
            segment.add('default', '/${action}/*', 'site.index', { extension: 'html' }).defaultRoute('defaultSimple', 'site.index', { extension: 'html' });
        });

        return this;
    }
};
exports.default = RouterBuilder;
//# sourceMappingURL=RouterBuilder.js.map