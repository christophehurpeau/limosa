"use strict";
var __moduleName = "router";
require('springbokjs-shim/es6');
var S = require('springbokjs-utils');
var RouterRoute = require('./router_route/route');
var RouterRouteSegment = require('./router_route/segment');
var Route = require('./route');
var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;
var Router = S.newClass();
module.exports = Router;
Router.extendPrototype({
  construct: function(routesTranslations) {
    this._routesMap = new Map();
    this._routes = [];
    this._routesTranslations = routesTranslations;
  },
  get: function(key) {
    return this._routesMap.get(key);
  },
  addRoute: function(routeKey, route) {
    if (route instanceof RouterRoute) {
      this._addInternalRoute(routeKey, route);
    }
    this._routes.push(route);
  },
  _addInternalRoute: function(routeKey, route) {
    this._routesMap.set(routeKey, route);
  },
  find: function(path) {
    var lang = arguments[1] !== (void 0) ? arguments[1] : 'en';
    path = '/' + path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash, '');
    return this._findRoute(this._routes, path, path, lang);
  },
  _findRoute: function(routes, completePath, path, lang, namedParams) {
    var $__0 = this;
    var result;
    routes.some((function(route) {
      var routeLang = route.get(lang);
      if (!routeLang) {
        throw new Error();
      }
      if (console && console.info) {
        console.info('[springbokjs-router] trying ' + routeLang.regExp);
      }
      var match = routeLang.match(path);
      if (!match) {
        return false;
      }
      match.shift();
      var groupCount = match.length;
      if (route instanceof RouterRouteSegment) {
        var restOfThePath = match[--groupCount];
        if (route.getNamedParamsCount() !== 0) {
          if (!namedParams) {
            namedParams = new Map();
          }
          var group = 0;
          route.namedParams.forEach((function(paramName) {
            var value = match[group++];
            if (value) {
              namedParams.set(paramName, value);
            }
          }));
        }
        result = $__0._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
      } else {
        result = $__0._createRoute(completePath, lang, route, match, groupCount, namedParams);
      }
      return true;
    }));
    return result;
  },
  _createRoute: function(completePath, lang, route, match, groupCount, namedParams) {
    var group = 0;
    var extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];
    var controller = route.controller,
        action = route.action;
    var otherParams;
    if (route.getNamedParamsCount() !== 0) {
      if (!namedParams) {
        namedParams = new Map();
      }
      route.namedParams.forEach((function(paramName) {
        var value = match[group++];
        if (value) {
          namedParams.set(paramName, value);
        }
      }));
      if (!namedParams.size) {
        namedParams = undefined;
      }
    }
    if (namedParams) {
      if (namedParams.has('controller')) {
        controller = this._routesTranslations.untranslate(namedParams.get('controller'), lang);
        controller = controller[0].toUpperCase() + controller.substring(1);
        namedParams.delete('controller');
      }
      if (namedParams.has('action')) {
        action = this._routesTranslations.untranslate(namedParams.get('action'), lang);
        namedParams.delete('action');
      }
      if (!namedParams.size) {
        namedParams = undefined;
      }
    }
    if (group + 1 === groupCount && match[group]) {
      otherParams = match[group].split('/');
    }
    return new Route(completePath, controller, action, namedParams, otherParams, extension);
  },
  createLink: function(lang, routeKey, params, extension, query, hash) {
    var $__0 = this;
    var route = this._routesMap[routeKey];
    var plus = '';
    if (extension) {
      plus = '.' + extension;
    } else if (route.extension) {
      plus = '.' + route.extension;
    }
    var link = route.routes[lang].strf;
    link = S.string.vformat(link, params.map((function(param) {
      $__0._routesTranslations.translate(param, lang);
    })));
    return (link === '/' ? link : link.replace(regExpEndingSlash, '')) + plus;
  }
});
