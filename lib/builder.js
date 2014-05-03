"use strict";
var __moduleName = "builder";
var S = require('springbokjs-utils');
var Router = require('./router');
var RouterRoute = require('./router_route/route');
var RouterRouteSegment = require('./router_route/segment');
var RouterRouteLang = require('./router_route/lang');
var regExpEndingSlash = /\/+$/;
var RouterBuilderSegment = S.newClass();
S.extendPrototype(RouterBuilderSegment, {
  construct: function(builder, route, parent) {
    this.builder = builder;
    this.route = route;
    this.parent = parent;
  },
  add: function(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
    var route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
    this.route.subRoutes.push(route);
    this.builder.router._addInternalRoute(routeKey, route);
    return this;
  },
  _createRoute: function(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
    return this.builder._createRoute(false, this.route, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
  },
  defaultRoute: function(routeKey, controllerAndActionSeparatedByDot, options) {
    var route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
    this.route.subRoutes.push(route);
    this.builder.router._addInternalRoute(routeKey, route);
    return this;
  },
  addSegment: function(routeUrl, options, buildSegment) {
    if (S.isFunction(options)) {
      buildSegment = options;
      options = {};
    }
    var route = this.builder._createRouteSegment(this.route, routeUrl, options.namedParamsDefinition, options.routeLangs);
    var segment = new RouterBuilderSegment(this.buider, route, this.route);
    buildSegment(segment);
    this.router.addRoute(null, route);
  }
});
var Builder = S.newClass();
module.exports = Builder;
Builder.extendPrototype({
  construct: function(routesTranslations, allLangs) {
    this._routesTranslations = routesTranslations;
    this._allLangs = allLangs;
    this.router = new Router(routesTranslations);
    this.regExpNamedParam = /(\(\?)?\:([a-zA-Z]+)/g;
    this.translatableRoutePart = /\/([a-zA-Z\_]+)/g;
    this.translatableRouteNamedParamValue = /^[a-zA-Z\|\_]+$/g;
  },
  translate: function(lang, string) {
    var lstring = string.toLowerCase();
    var translation = this._routesTranslations.translate(lstring, lang);
    return translation;
  },
  fromMap: function(routes) {
    S.forEach(routes, function(route, routeKey) {
      this.add(routeKey, routeKey, route[0], {
        namedParamsDefinition: route.length > 1 ? route[1] : undefined,
        routeLangs: route.length > 2 ? (route[2] || {}) : {},
        extension: route.length > 3 ? route[3] : undefined
      });
    });
  },
  add: function(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
    var route = this._createRoute(false, undefined, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
    this.router.addRoute(routeKey, route);
    return this;
  },
  addSegment: function(routeUrl, options, buildSegment) {
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
  _createRouteSegment: function(parent, routeUrl, namedParamsDefinition, routeLangs) {
    return this._createRoute(true, parent, routeUrl, undefined, namedParamsDefinition, routeLangs, undefined);
  },
  _createRoute: function(segment, parent, routeUrl, controllerAndActionSeparatedByDot, namedParamsDefinition, routeLangs, extension) {
    var $__0 = this;
    var controllerAndAction;
    if (!segment) {
      controllerAndAction = controllerAndActionSeparatedByDot.split('.');
    }
    if (routeLangs == null) {
      routeLangs = {};
    }
    if (Object.keys(routeLangs).length !== 0) {
      this._allLangs.forEach((function(lang) {
        if (!routeLangs[lang]) {
          if (lang == 'en') {
            routeLangs.en = routeUrl;
          } else {
            throw new Error('Missing lang "' + lang + '" for route "' + routeUrl + '"');
          }
        }
      }));
    } else if (!routeUrl.match(this.translatableRoutePart)) {
      this._allLangs.forEach((function(lang) {
        routeLangs[lang] = routeUrl;
      }));
    } else {
      this._allLangs.forEach((function(lang) {
        routeLangs[lang] = routeUrl.replace($__0.translatableRoutePart, (function(str, p1) {
          return '/' + $__0.translate(lang, p1);
        }));
      }));
    }
    var paramNames = [];
    routeLangs[this._allLangs[0]].replace(this.regExpNamedParam, (function(str, p1, p2) {
      if (p1) {
        return str;
      }
      paramNames.push(p2);
    }));
    var finalRoute = segment ? new RouterRouteSegment(paramNames) : new RouterRoute(controllerAndAction[0], controllerAndAction[1], extension, paramNames);
    S.forEach(routeLangs, (function(routeLang, lang) {
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
      var replacedRegExp = routeLangRegExp.replace($__0.regExpNamedParam, (function(str, m1, m2) {
        if (m1 != null) {
          return str;
        }
        if (namedParamsDefinition && namedParamsDefinition[m2]) {
          var paramDefVal = namedParamsDefinition[m2];
          if (!S.isString(paramDefVal)) {
            paramDefVal = paramDefVal[lang];
          } else {
            if (paramDefVal.match($__0.translatableRouteNamedParamValue)) {
              paramDefVal = paramDefVal.split('|').map((function(s) {
                return $__0.translate(lang, s);
              })).join('|');
            }
          }
          return paramDefVal == 'id' ? '([0-9]+)' : '(' + paramDefVal.replace('(', '(?:') + ')';
        }
        if (m2 == 'id') {
          return '([0-9]+)';
        }
        return '([^/.]+)';
      }));
      var routeLangStrf = routeLang.replace(/(\:[a-zA-Z_]+)/g, '%s').replace(/[\?\(\)]/g, '').replace('/*', '%s').trim().replace(regExpEndingSlash, '');
      if (parent != null) {
        routeLangStrf = parent.routes[lang].strf + routeLangStrf;
      }
      if (routeLangStrf.length === 0) {
        routeLangStrf = '/';
      }
      finalRoute.set(lang, new RouterRouteLang(new RegExp('^' + replacedRegExp + extensionRegExp + (segment ? '(.*)$' : '$')), routeLangStrf));
    }));
    return finalRoute;
  },
  addDefaultRoutes: function() {
    this.addSegment('/:controller', {extension: 'html'}, (function(segment) {
      segment.add('default', '/:action/*', 'Site.index', {extension: 'html'}).defaultRoute('defaultSimple', 'Site.index', {extension: 'html'});
    }));
  }
});
