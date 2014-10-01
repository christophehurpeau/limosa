"use strict";
var $__Object$defineProperties = Object.defineProperties;
var S = require('springbokjs-utils');
var Router = require('./router');
var RouterRoute = require('./router_route/route');
var RouterRouteSegment = require('./router_route/segment');
var RouterRouteLang = require('./router_route/lang');
var regExpEndingSlash = /\/+$/;
var RouterBuilderSegment = function() {
  "use strict";
  function RouterBuilderSegment(builder, route, parent) {
    this.builder = builder;
    this.route = route;
    this.parent = parent;
  }
  $__Object$defineProperties(RouterBuilderSegment.prototype, {
    add: {
      value: function(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        var route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
      },
      enumerable: false,
      writable: true
    },
    _createRoute: {
      value: function(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        return this.builder._createRoute(false, this.route, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
      },
      enumerable: false,
      writable: true
    },
    defaultRoute: {
      value: function(routeKey, controllerAndActionSeparatedByDot, options) {
        var route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
      },
      enumerable: false,
      writable: true
    },
    addSegment: {
      value: function(routeUrl, options, buildSegment) {
        if (S.isFunction(options)) {
          buildSegment = options;
          options = {};
        }
        var route = this.builder._createRouteSegment(this.route, routeUrl, options.namedParamsDefinition, options.routeLangs);
        var segment = new RouterBuilderSegment(this.buider, route, this.route);
        buildSegment(segment);
        this.router.addRoute(null, route);
      },
      enumerable: false,
      writable: true
    }
  });
  return RouterBuilderSegment;
}();
var Builder = function() {
  "use strict";
  function Builder(routesTranslations, allLangs) {
    this._routesTranslations = routesTranslations;
    this._allLangs = allLangs;
    this.router = new Router(routesTranslations);
    this.regExpNamedParam = /(\(\?)?\:([a-zA-Z]+)/g;
    this.translatableRoutePart = /\/([a-zA-Z\_]+)/g;
    this.translatableRouteNamedParamValue = /^[a-zA-Z\|\_]+$/g;
  }
  $__Object$defineProperties(Builder.prototype, {
    translate: {
      value: function(lang, string) {
        var lstring = string.toLowerCase();
        var translation = this._routesTranslations.translate(lstring, lang);
        return translation;
      },
      enumerable: false,
      writable: true
    },
    fromMap: {
      value: function(routes) {
        routes.forEach(function(route, routeKey) {
          this.add(routeKey, routeKey, route[0], {
            namedParamsDefinition: route.length > 1 ? route[1] : undefined,
            routeLangs: route.length > 2 ? (route[2] || {}) : {},
            extension: route.length > 3 ? route[3] : undefined
          });
        });
      },
      enumerable: false,
      writable: true
    },
    add: {
      value: function(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        var route = this._createRoute(false, undefined, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
        this.router.addRoute(routeKey, route);
        return this;
      },
      enumerable: false,
      writable: true
    },
    addSegment: {
      value: function(routeUrl, options, buildSegment) {
        if (S.isFunction(options)) {
          buildSegment = options;
          options = {};
        }
        var route = this._createRouteSegment(undefined, routeUrl, options.namedParamsDefinition, options.routeLangs);
        var segment = new RouterBuilderSegment(this, route, undefined);
        buildSegment(segment);
        this.router.addRoute(undefined, route);
        return this;
      },
      enumerable: false,
      writable: true
    },
    _createRouteSegment: {
      value: function(parent, routeUrl, namedParamsDefinition, routeLangs) {
        return this._createRoute(true, parent, routeUrl, undefined, namedParamsDefinition, routeLangs, undefined);
      },
      enumerable: false,
      writable: true
    },
    _createRoute: {
      value: function(segment, parent, routeUrl, controllerAndActionSeparatedByDot, namedParamsDefinition, routeLangs, extension) {
        var controllerAndAction;
        if (!segment) {
          controllerAndAction = controllerAndActionSeparatedByDot.split('.');
        }
        if (routeLangs == null) {
          routeLangs = new Map();
        } else {
          routeLangs = S.object.toMap(routeLangs);
        }
        if (routeLangs.size !== 0) {
          this._allLangs.forEach(function(lang) {
            if (!routeLangs.has(lang)) {
              if (lang == 'en') {
                routeLangs.set('en', routeUrl);
              } else {
                throw new Error('Missing lang "' + lang + '" for route "' + routeUrl + '"');
              }
            }
          });
        } else if (!routeUrl.match(this.translatableRoutePart)) {
          this._allLangs.forEach(function(lang) {
            routeLangs.set(lang, routeUrl);
          });
        } else {
          this._allLangs.forEach(function(lang) {
            routeLangs.set(lang, routeUrl.replace(this.translatableRoutePart, function(str, p1) {
              return '/' + this.translate(lang, p1);
            }.bind(this)));
          }.bind(this));
        }
        var paramNames = [];
        routeLangs.get(this._allLangs[0]).replace(this.regExpNamedParam, function(str, p1, p2) {
          if (p1) {
            return str;
          }
          paramNames.push(p2);
        });
        var finalRoute = segment ? new RouterRouteSegment(paramNames) : new RouterRoute(controllerAndAction[0], controllerAndAction[1], extension, paramNames);
        routeLangs.forEach(function(routeLang, lang) {
          var specialEnd = false,
              specialEnd2 = false;
          var routeLangRegExp;
          if (!segment && (specialEnd = routeLang.endsWith('/*'))) {
            routeLangRegExp = routeLang.slice(0, -2);
          } else if (!segment && (specialEnd2 = routeLang.endsWith('/*)?'))) {
            routeLangRegExp = routeLang.slice(0, -4) + routeLang.slice(-2);
          } else {
            routeLangRegExp = routeLang;
          }
          routeLangRegExp = routeLangRegExp.replace(/\//g, '\\/').replace(/\-/g, '\\-').replace(/\*/g, '(.*)').replace(/\(/g, '(?:');
          if (specialEnd) {
            routeLangRegExp = routeLangRegExp + '(?:\\/([^.]*))?';
          } else if (specialEnd2) {
            routeLangRegExp = routeLangRegExp.slice(0, -2) + '(?:\\/(.*))?' + routeLangRegExp.slice(-2);
          }
          var extensionRegExp = segment || extension == null ? '' : (extension == 'html' ? '(?:\\.(html))?' : '\\.(' + extension + ')');
          var replacedRegExp = routeLangRegExp.replace(this.regExpNamedParam, function(str, m1, m2) {
            if (m1) {
              return str;
            }
            if (namedParamsDefinition && namedParamsDefinition[m2]) {
              var paramDefVal = namedParamsDefinition[m2];
              if (S.isString(paramDefVal)) {
                if (paramDefVal.match(this.translatableRouteNamedParamValue)) {
                  paramDefVal = paramDefVal.split('|').map(function(s) {
                    return this.translate(lang, s);
                  }.bind(this)).join('|');
                }
              } else if (paramDefVal instanceof RegExp) {
                paramDefVal = paramDefVal.source;
              } else {
                paramDefVal = paramDefVal[lang];
              }
              return paramDefVal == 'id' ? '([0-9]+)' : '(' + paramDefVal.replace('(', '(?:') + ')';
            }
            if (m2 === 'id') {
              return '([0-9]+)';
            }
            return '([^\\/.]+)';
          }.bind(this));
          var routeLangStrf = routeLang.replace(/(\:[a-zA-Z_]+)/g, '%s').replace(/[\?\(\)]/g, '').replace('/*', '%s').trim().replace(regExpEndingSlash, '');
          if (parent != null) {
            routeLangStrf = parent.routes.get(lang).strf + routeLangStrf;
          }
          if (routeLangStrf.length === 0) {
            routeLangStrf = '/';
          }
          finalRoute.set(lang, new RouterRouteLang(new RegExp('^' + replacedRegExp + extensionRegExp + (segment ? '(.*)$' : '$')), routeLangStrf));
        }.bind(this));
        return finalRoute;
      },
      enumerable: false,
      writable: true
    },
    addDefaultRoutes: {
      value: function() {
        this.addSegment('/:controller', {extension: 'html'}, function(segment) {
          segment.add('default', '/:action/*', 'Site.index', {extension: 'html'}).defaultRoute('defaultSimple', 'Site.index', {extension: 'html'});
        });
      },
      enumerable: false,
      writable: true
    }
  });
  return Builder;
}();
module.exports = Builder;

//# sourceMappingURL=builder.js.map