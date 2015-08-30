import object2map from 'object2map';
import Router from './Router';
// import RouterRouteCommon from './RouterRoute/Common';
import RouterRoute from './RouterRoute/Route';
import RouterRouteSegment from './RouterRoute/Segment';
import RouterRouteLang from './RouterRoute/Lang';
import UrlGenerator from './UrlGenerator/UrlGenerator';
import UrlGeneratorNamedParamPart from './UrlGenerator/UrlGeneratorNamedParamPart';
import UrlGeneratorOptionalGroupPart from './UrlGenerator/UrlGeneratorOptionalGroupPart';
import UrlGeneratorPartArray from './UrlGenerator/UrlGeneratorPartArray';
import UrlGeneratorStringPart from './UrlGenerator/UrlGeneratorStringPart';

// const regExpStartingSlash = /^\/+/;
// const regExpEndingSlash = /\/+$/;

/**
 * Build a route segment
 */
class RouterBuilderSegment {
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
     * @param {String} routeKey
     * @param {String} routeUrl
     * @param {String} controllerAndActionSeparatedByDot
     * @param {Object} options namedParamsDefinition, routeLangs, extension
     */
    add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
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
     */
    _createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        return this.builder._createRoute(false, this.route, routeUrl,
                            controllerAndActionSeparatedByDot,
                            options && options.namedParamsDefinition,
                            options && options.routeLangs,
                            options && options.extension);
    }

    /**
     * @param {String} routeKey
     * @param {String} controllerAndActionSeparatedByDot
     * @param {Object} options namedParamsDefinition, routeLangs, extension
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
     * @param {String} routeUrl
     * @param {Object} [options] namedParamsDefinition, routeLangs
     * @param {Function} buildSegment
     */
    addSegment(routeUrl, options, buildSegment) {
        if (typeof options === 'function') {
            buildSegment = options;
            options = {};
        }

        const route = this.builder._createRouteSegment(this.route, routeUrl,
                            options.namedParamsDefinition, options.routeLangs);
        const segment = new RouterBuilderSegment(this.buider, route, this.route);
        buildSegment(segment);
        this.router.addRoute(null, route);
    }
}

/**
 * @class
 */
export default class RouterBuilder {
    /**
     * @constructs
     * @param {RoutesTranslations} routesTranslations
     * @param {Array} allLangs Array of all langs
     */
    constructor(routesTranslations, allLangs) {
        this._routesTranslations = routesTranslations;
        this._allLangs = allLangs;
        this.router = new Router(routesTranslations);

        this.regExpNamedParam = /\$\{([a-zA-Z]+)}/g;
        this.translatableRoutePart = /\/([a-zA-Z_]+)/g;
        this.translatableRouteNamedParamValue = /^[a-zA-Z\|_]+$/g;
        this.regExpNamedParamOrOptionalPart = /(?:\$\{([a-zA-Z]+)})|(?:\[([^\]]+)\])/g;
    }

    /**
     * @param {String} lang
     * @param {String} string
     * @return {String}
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
        routes.forEach(function(route, routeKey) {
            this.add(routeKey, routeKey, route[0], {
                namedParamsDefinition: route.length > 1 ? route[1] : undefined,
                routeLangs: route.length > 2 ? (route[2] || {}) : {},
                extension: route.length > 3 ? route[3] : undefined,
            });
        });
    }

    /**
     * @param {String} routeKey
     * @param {String} routeUrl
     * @param {String} controllerAndActionSeparatedByDot
     * @param {Object} options namedParamsDefinition, routeLangs, extension
     */
    add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(false, undefined, routeUrl, controllerAndActionSeparatedByDot,
                            options && options.namedParamsDefinition,
                            options && options.routeLangs,
                            options && options.extension);
        this.router.addRoute(routeKey, route);
        return this;
    }

    /**
     * @param {String} routeUrl
     * @param {Object} [options] namedParamsDefinition, routeLangs
     * @param {Function} buildSegment
     */
    addSegment(routeUrl, options, buildSegment) {
        if (typeof options === 'function') {
            buildSegment = options;
            options = {};
        }

        const route = this._createRouteSegment(undefined, routeUrl,
                            options.namedParamsDefinition, options.routeLangs);
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
     */
    _createRouteSegment(parent, routeUrl, namedParamsDefinition, routeLangs) {
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
     */
    _createRoute(segment, parent, routeUrl, controllerAndActionSeparatedByDot,
                        namedParamsDefinition, routeLangs, extension) {
        let controllerAndAction;
        if (!segment) {
            controllerAndAction = controllerAndActionSeparatedByDot.split('.');
            // assert(controllerAndAction.length == 2);
        }

        if (routeLangs == null) {
            routeLangs = new Map();
        } else {
            routeLangs = object2map(routeLangs);
        }

        // -- Route langs --

        if (routeLangs.size !== 0) {
            this._allLangs.forEach((lang) => {
                if (!routeLangs.has(lang)) {
                    if (lang == 'en') {
                        routeLangs.set('en', routeUrl);
                    } else {
                        throw new Error(`Missing lang ${lang}" for route "${routeUrl}"`);
                    }
                }
            });
        } else if (!routeUrl.match(this.translatableRoutePart)) {
            this._allLangs.forEach((lang) => {
                routeLangs.set(lang, routeUrl);
            });
        } else {
            this._allLangs.forEach((lang) => {
                routeLangs.set(lang, routeUrl.replace(this.translatableRoutePart,
                  (str, p1) => '/' + this.translate(lang, p1)));
            });
        }

        const paramNames = [];
        routeLangs.get(this._allLangs[0]).replace(this.regExpNamedParam, (str, paramName) => {
            paramNames.push(paramName);
        });
        // console.log(routeLangs[this._allLangs[0]], paramNames);

        const finalRoute = segment ? new RouterRouteSegment(paramNames)
            : new RouterRoute(controllerAndAction[0], controllerAndAction[1], extension, paramNames);

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

            routeLangRegExp = routeLangRegExp
                .replace(/\//g, '\\/')
                .replace(/\-/g, '\\-')
                .replace(/\*/g, '(.*)')
                .replace(/\[/g, '(')
                .replace(/]/g, ')')
                .replace(/\(/g, '(?:');

            if (specialEnd) {
                routeLangRegExp = routeLangRegExp + '(?:\\/([^.]*))?';
            } else if (specialEnd2) {
                // ends now is : /*)?
                routeLangRegExp = routeLangRegExp.slice(0, -2) + '(?:\\/(.*))?' + routeLangRegExp.slice(-2);
            }

            const extensionRegExp = (() => {
                if (segment || extension == null) {
                    return '';
                }

                if (extension == 'html') {
                    return '(?:\\.(html))?';
                }

                return '\\.(' + extension + ')';
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

            const regExpNamedParamOrOptionalPart = this.regExpNamedParamOrOptionalPart;
            const parts = routeLang.length === 0 ? null : (function buildParts(routeLangPart) {
                const parts = [];
                let index = 0;
                routeLangPart.replace(regExpNamedParamOrOptionalPart, (match, paramName, optionalGroup, offset) => {
                    if (offset > index) {
                        parts.push(new UrlGeneratorStringPart(routeLang.substring(index, offset)));
                    }

                    index = offset + match.length;

                    if (optionalGroup) {
                        const optionalGroupParts = buildParts(optionalGroup);
                        parts.push(new UrlGeneratorOptionalGroupPart(optionalGroupParts));
                    } else {
                        parts.push(new UrlGeneratorNamedParamPart(paramName, translate));
                    }

                    return match;
                });

                if (index < routeLangPart.length) {
                    parts.push(new UrlGeneratorStringPart(routeLang.substring(index)));
                }

                if (parts.length === 0) {
                    throw new Error(routeLangPart);
                }

                return new UrlGeneratorPartArray(parts);
            })(routeLang);

            let urlGeneratorParts;
            if (parent != null) {
                const parentParts = parent.routes.get(lang).urlGenerator.parts;
                const mergedParts = parts === null ? parentParts : new UrlGeneratorPartArray([parentParts, parts]);
                urlGeneratorParts = new UrlGenerator(mergedParts, extension);
            } else {
                urlGeneratorParts = new UrlGenerator(parts, extension);
            }

            finalRoute.set(lang, new RouterRouteLang(
                new RegExp('^' + replacedRegExp + extensionRegExp + (segment ? '(.*)$' : '$')),
                urlGeneratorParts
            ));
        });

        return finalRoute;
    }

    /**
     * Add default routes
     */
    addDefaultRoutes() {
        this.addSegment('/${controller}', { extension: 'html' }, (segment) => {
            segment
                .add('default', '/${action}/*', 'site.index', { extension: 'html' })
                .defaultRoute('defaultSimple', 'site.index', { extension: 'html' });
        });

        return this;
    }
}
