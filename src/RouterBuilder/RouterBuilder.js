import Router from '../Router';
// import RouterRouteCommon from '../RouterRoute/Common';
import RouterRoute from '../RouterRoute/Route';
import RouterRouteSegment from '../RouterRoute/Segment';
import RouterRouteLang from '../RouterRoute/Lang';
import UrlGenerator from '../UrlGenerator/UrlGenerator';
import UrlGeneratorNamedParamPart from '../UrlGenerator/UrlGeneratorNamedParamPart';
import UrlGeneratorOptionalGroupPart from '../UrlGenerator/UrlGeneratorOptionalGroupPart';
import UrlGeneratorPartArray from '../UrlGenerator/UrlGeneratorPartArray';
import UrlGeneratorStringPart from '../UrlGenerator/UrlGeneratorStringPart';
import RouterBuilderSegment from './RouterBuilderSegment';

// const regExpStartingSlash = /^\/+/;
// const regExpEndingSlash = /\/+$/;

const object2map = object => new Map(Object.keys(object).map(key => [key, object[key]]));

export default class RouterBuilder {
    /**
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
     * @param {string} lang
     * @param {string} string
     * @return {string}
     */
    translate(lang, string) {
        const lstring = string.toLowerCase();
        return this._routesTranslations.translate(lstring, lang);
    }

    /**
     * @param {Map} routes
     */
    fromMap(routes) {
        routes.forEach((route, routeKey) => {
            this.add(routeKey, routeKey, route[0], {
                namedParamsDefinition: route.length > 1 ? route[1] : undefined,
                routeLangs: route.length > 2 ? (route[2] || {}) : {},
                extension: route.length > 3 ? route[3] : undefined,
            });
        });
    }

    /**
     * @param {string|Object} routeKeyOrRoute key to get the route. If object: { routeKey, routeUrl, controller, action, namedParamsDefinition, routeLangs, extension }
     * @param {string|Function} routeUrlOrSegmentBuilder url, or if function: segment
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {string} [options.extension]
     * If routeKey is an object:
     * @param {string} routeKeyOrRoute.routeKeyOrRoute key to get the route
     * @param {string} routeKeyOrRoute.routeUrl
     * @param {string} [routeKeyOrRoute.controller]
     * @param {string} [routeKeyOrRoute.action]
     * @param {Map} [routeKeyOrRoute.namedParamsDefinition]
     * @param {Map} [routeKeyOrRoute.routeLangs]
     * @param {string} [routeKeyOrRoute.extension]
     */
    add(routeKeyOrRoute, routeUrlOrSegmentBuilder, controllerAndActionSeparatedByDot, options) {
        if (typeof routeKeyOrRoute === 'string') {
            const [controller, action] = controllerAndActionSeparatedByDot.split('.');
            routeKeyOrRoute = {
                key: routeKeyOrRoute,
                url: routeUrlOrSegmentBuilder,
                controller,
                action,
                namedParamsDefinition: options && options.namedParamsDefinition,
                routeLangs: options && options.routeLangs,
                extension: options && options.extension,
            };
        }

        let {
            key,
            url,
            controller,
            action,
            namedParamsDefinition,
            routeLangs,
            extension,
        } = routeKeyOrRoute;

        if (typeof routeUrlOrSegmentBuilder === 'function') {
            return this.addSegment(
                url,
                { namedParamsDefinition, routeLangs, extension },
                routeUrlOrSegmentBuilder
            );
        }

        const route = this._createRoute(
            key,
            undefined,
            url,
            { controller, action },
            namedParamsDefinition,
            routeLangs,
            extension
        );
        this.router.addRoute(key, route);
        return this;
    }

    /**
     * @param {string} routeUrl
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {Function} buildSegment
     */
    addSegment(
        routeUrl: string,
        options: ?{ namedParamsDefinition: ?Map, routeLangs: ?Map },
        buildSegment: Function
    ) {
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
     * @param {RouterRouteSegment} [parent]
     * @param {string} routeUrl
     * @param {Map} namedParamsDefinition
     * @param {Map} routeLangs
     * @return {RouterRouteCommon}
     */
    _createRouteSegment(
        parent: ?RouterRouteSegment,
        routeUrl: string,
        namedParamsDefinition: ?Map,
        routeLangs: ?Map
    ) {
        return this._createRoute(
            null,
            parent,
            routeUrl,
            undefined,
            namedParamsDefinition,
            routeLangs,
            undefined
        );
    }

    /**
     * @param {string} [key] if null this is a segment
     * @param {RouterRouteSegment} [parent]
     * @param {string} routeUrl
     * @param {string|Object} controllerAndAction
     * @param {Object} [namedParamsDefinition]
     * @param {Map|Object} [routeLangs]
     * @param {string} [extension]
     * @return {RouterRouteCommon}
     */
    _createRoute(
        key: ?string,
        parent: ?RouterRouteSegment,
        routeUrl: string,
        controllerAndAction: ?string|{controller: ?string, action: ?string},
        namedParamsDefinition: ?Object,
        routeLangs: ?Map|Object,
        extension: ?string,
    ) {
        const isSegment = key == null;
        if (!isSegment) {
            if (typeof controllerAndAction === 'string') {
                controllerAndAction = controllerAndAction.split('.');
                controllerAndAction = {
                    controller: controllerAndAction[0],
                    action: controllerAndAction[1],
                };
            }
        } else if (controllerAndAction) {
            throw new Error(`Cannot have controllerAndAction for segment "${routeUrl}"`);
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
                    if (lang === 'en') {
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
            this._allLangs.forEach(lang => {
                routeLangs.set(
                    lang,
                    routeUrl.replace(
                        this.translatableRoutePart,
                        (str, p1) => `/${this.translate(lang, p1)}`)
                );
            });
        }

        const paramNames = [];
        routeLangs.get(this._allLangs[0]).replace(this.regExpNamedParam, (str, paramName) => {
            paramNames.push(paramName);
        });

        const finalRoute = isSegment ? new RouterRouteSegment(paramNames)
            : new RouterRoute(key, controllerAndAction.controller, controllerAndAction.action, extension, paramNames);

        routeLangs.forEach((routeLang, lang) => {
            const translate = this.translate.bind(this, lang);
            let specialEnd = false;
            let specialEnd2 = false;
            let routeLangRegExp;

            if (!isSegment && (specialEnd = routeLang.endsWith('/*'))) {
                routeLangRegExp = routeLang.slice(0, -2);
            } else if (!isSegment && (specialEnd2 = routeLang.endsWith('/*]'))) {
                routeLangRegExp = routeLang.slice(0, -3) + routeLang.slice(-1);
            } else {
                routeLangRegExp = routeLang;
            }

            routeLangRegExp = routeLangRegExp
                .replace(/\//g, '\\/')
                .replace(/-/g, '\\-')
                .replace(/\*/g, '(.*)')
                .replace(/\[/g, '(')
                .replace(/]/g, ')?')
                .replace(/\(/g, '(?:');

            if (specialEnd) {
                routeLangRegExp = `${routeLangRegExp}(?:\\/([^.]*))?`;
            } else if (specialEnd2) {
                // ends now is : /*)?
                routeLangRegExp = `${routeLangRegExp.slice(0, -2)}(?:\\/(.*))?${routeLangRegExp.slice(-2)}`;
            }

            const extensionRegExp = (() => {
                if (isSegment || extension == null) {
                    return '';
                }

                if (extension === 'html') {
                    return '(?:\\.(html))?';
                }

                return `\\.(${extension})`;
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

                    return paramDefVal === 'id' ? '([0-9]+)' : `(${paramDefVal.replace('(', '(?:')})`;
                }

                if (paramName === 'id') {
                    return '([0-9]+)';
                }

                return '([^\\/.]+)';
            });

            if (!isSegment && specialEnd) {
                routeLang = routeLang.slice(0, -2);
            } else if (!isSegment && specialEnd2) {
                routeLang = routeLang.slice(0, -3) + routeLang.slice(-1);
            }

            const regExpNamedParamOrOptionalPart = this.regExpNamedParamOrOptionalPart;
            const parts = routeLang.length === 0 ? null : (function buildParts(routeLangPart) {
                const parts = [];
                let index = 0;
                routeLangPart.replace(
                    regExpNamedParamOrOptionalPart,
                    (match, paramName, optionalGroup, offset) => {
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
                    }
                );

                if (index < routeLangPart.length) {
                    parts.push(new UrlGeneratorStringPart(routeLang.substring(index)));
                }

                if (parts.length === 0) {
                    throw new Error(routeLangPart);
                }

                if (parts.length === 1) {
                    return parts[0];
                }

                return new UrlGeneratorPartArray(parts);
            }(routeLang));

            let urlGeneratorParts;
            if (parent != null) {
                const parentParts = parent.routes.get(lang).urlGenerator.parts;
                const mergedParts = parts === null ? parentParts
                    : new UrlGeneratorPartArray([parentParts, parts]);
                urlGeneratorParts = new UrlGenerator(mergedParts, extension);
            } else {
                urlGeneratorParts = new UrlGenerator(parts, extension);
            }

            finalRoute.set(lang, new RouterRouteLang(
                new RegExp(`^${replacedRegExp}${extensionRegExp}${isSegment ? '(.*)$' : '$'}`),
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
