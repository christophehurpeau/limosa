//import * as S from 'springbokjs-utils';
var S = require('springbokjs-utils');
import Router from './Router';
//import RouterRouteCommon from './RouterRoute/Common';
import RouterRoute from './RouterRoute/Route';
import RouterRouteSegment from './RouterRoute/Segment';
import RouterRouteLang from './RouterRoute/Lang';

//var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;




/**
 * Build a route segment
 *
 * @class
 */
class RouterBuilderSegment {
    /**
     * @constructs
     * @param {RouterBuilder} builder
     * @param {RouterRouteSegment} router
     * @param {RouterRouteSegment=} parent
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
        var route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
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
        var route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
        //this.route.defaultRoute = route;
        //this.builder.router._addInternalRoute(routeKey, route);
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
    }


    /**
     * @param {String} routeUrl
     * @param {Object} options namedParamsDefinition, routeLangs
     * @param {Function} buildSegment
     */
    addSegment(routeUrl, options, buildSegment) {
        if (S.isFunction(options)) {
            buildSegment = options;
            options = {};
        }
        var route = this.builder._createRouteSegment(this.route, routeUrl,
                            options.namedParamsDefinition, options.routeLangs);
        var segment = new RouterBuilderSegment(this.buider, route, this.route);
        buildSegment(segment);
        this.router.addRoute(null, route);
      }
}


/**
 * @class
 */
export default class Builder {
    /**
     * @constructs
     * @param {RoutesTranslations} routesTranslations
     * @param {Array} allLangs Array of all langs
     */
    constructor(routesTranslations, allLangs) {
        this._routesTranslations = routesTranslations;
        this._allLangs = allLangs;
        this.router = new Router(routesTranslations);

        this.regExpNamedParam = /(\(\?)?\:([a-zA-Z]+)/g;
        this.translatableRoutePart = /\/([a-zA-Z\_]+)/g;
        this.translatableRouteNamedParamValue = /^[a-zA-Z\|\_]+$/g;
    }

    /**
     * @param {String} lang
     * @param {String} string
     * @return {String}
     */
    translate(lang, string) {
        var lstring = string.toLowerCase();
        var translation = this._routesTranslations.translate(lstring, lang);
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
                extension: route.length > 3 ? route[3] : undefined
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
        var route = this._createRoute(false, undefined, routeUrl, controllerAndActionSeparatedByDot,
                            options && options.namedParamsDefinition,
                            options && options.routeLangs,
                            options && options.extension);
        this.router.addRoute(routeKey, route);
        return this;
    }

    /**
     * @param {String} routeUrl
     * @param {Object} options namedParamsDefinition, routeLangs
     * @param {Function} buildSegment
     */
    addSegment(routeUrl, options, buildSegment) {
        if (S.isFunction(options)) {
            buildSegment = options;
            options = {};
        }
        var route = this._createRouteSegment(undefined, routeUrl,
                            options.namedParamsDefinition, options.routeLangs);
        var segment = new RouterBuilderSegment(this, route, undefined);
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
     * @param {Map} onamedParamsDefinition
     * @param {Map} routeLangs
     * @param {String} extension
     * @return {_RouterRouteCommon}
     */
    _createRoute(segment, parent, routeUrl, controllerAndActionSeparatedByDot,
                        namedParamsDefinition, routeLangs, extension) {
        var controllerAndAction;
        if (!segment) {
          controllerAndAction = controllerAndActionSeparatedByDot.split('.');
          //assert(controllerAndAction.length == 2);
        }

        if (routeLangs == null) {
            routeLangs = new Map();
        } else {
            routeLangs = S.object.toMap(routeLangs);
        }

        // -- Route langs --

        if (routeLangs.size !== 0) {
            this._allLangs.forEach((lang) => {
                if (!routeLangs.has(lang)) {
                    if (lang == 'en') {
                        routeLangs.set('en', routeUrl);
                    } else {
                        throw new Error('Missing lang "'+ lang + '" for route "' + routeUrl + '"');
                    }
                }
            });
        } else  if (!routeUrl.match(this.translatableRoutePart)) {
            this._allLangs.forEach((lang) => {
                routeLangs.set(lang, routeUrl);
            });
        } else {
            this._allLangs.forEach((lang) => {
                routeLangs.set(lang, routeUrl.replace(this.translatableRoutePart,
                  (str, p1) => '/' + this.translate(lang, p1)));
            });
        }

        var paramNames = [];
        routeLangs.get(this._allLangs[0]).replace(this.regExpNamedParam, (str, p1, p2) => {
            if (p1) {
                return str;
            }
            paramNames.push(p2);
        });
        //console.log(routeLangs[this._allLangs[0]], paramNames);

        var finalRoute = segment ? new RouterRouteSegment(paramNames)
            : new RouterRoute(controllerAndAction[0], controllerAndAction[1], extension, paramNames);

        routeLangs.forEach((routeLang, lang) => {
            var specialEnd = false, specialEnd2 = false;
            var routeLangRegExp;

            if (!segment && (specialEnd = routeLang.endsWith('/*'))) {
                routeLangRegExp = routeLang.slice(0, -2);
            } else if (!segment && (specialEnd2 = routeLang.endsWith('/*)?'))) {
                routeLangRegExp = routeLang.slice(0, -4) + routeLang.slice(-2);
            } else {
                routeLangRegExp = routeLang;
            }

            routeLangRegExp = routeLangRegExp
                .replace(/\//g, '\\/')
                .replace(/\-/g, '\\-')
                .replace(/\*/g, '(.*)')
                .replace(/\(/g, '(?:');

          if (specialEnd) {
            routeLangRegExp = routeLangRegExp + '(?:\\/([^.]*))?';
          } else if (specialEnd2) {
            routeLangRegExp = routeLangRegExp.slice(0,-2) + '(?:\\/(.*))?' + routeLangRegExp.slice(-2);
          }

          var extensionRegExp = segment || extension == null ? '':
                    (extension == 'html' ? '(?:\\.(html))?': '\\.(' + extension + ')');

          var replacedRegExp = routeLangRegExp.replace(this.regExpNamedParam, (str, m1, m2) => {
            if (m1) {
                return str;
            }

            if (namedParamsDefinition && namedParamsDefinition[m2]) {
                var paramDefVal = namedParamsDefinition[m2];
                if (S.isString(paramDefVal)) {
                    if (paramDefVal.match(this.translatableRouteNamedParamValue)) {
                      paramDefVal = paramDefVal.split('|')
                          .map((s) => this.translate(lang, s)).join('|');
                        }
                    } else if (paramDefVal instanceof RegExp) {
                        paramDefVal = paramDefVal.source;
                    } else {
                        paramDefVal = paramDefVal[lang];
                }
                return paramDefVal == 'id' ? '([0-9]+)' : '(' + paramDefVal.replace('(','(?:') + ')';
            }

            if (m2 === 'id') {
              return '([0-9]+)';
            }

            return '([^\\/.]+)';
          });

          var routeLangStrf = routeLang.replace(/(\:[a-zA-Z_]+)/g, '%s')
              .replace(/[\?\(\)]/g, '')
              .replace('/*','%s')
              .trim()
              .replace(regExpEndingSlash, '');

          if (parent != null) {
            routeLangStrf = parent.routes.get(lang).strf + routeLangStrf;
          }

          if (routeLangStrf.length === 0) {
            routeLangStrf = '/';
          }
          finalRoute.set(lang, new RouterRouteLang(
              new RegExp('^' + replacedRegExp + extensionRegExp + ( segment ? '(.*)$' : '$')),
              routeLangStrf
          ));
        });

        return finalRoute;
    }

    /**
     * Add default routes
     */
    addDefaultRoutes() {
        this.addSegment('/:controller', { extension: 'html' }, (segment) => {
            segment
                .add('default', '/:action/*', 'site.index', { extension: 'html' })
                .defaultRoute('defaultSimple', 'site.index', { extension: 'html' });
        });
    }
}