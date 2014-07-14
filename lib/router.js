"use strict";
var $__Object$defineProperty = Object.defineProperty;
require('springbokjs-shim/es6');
var S = require('springbokjs-utils');
var RouterRoute = require('./router_route/route');
var RouterRouteSegment = require('./router_route/segment');
var Route = require('./route');
var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;
module.exports = function() {
  "use strict";
  function Router(routesTranslations) {
    this._routesMap = new Map();
    this._routes = [];
    this._routesTranslations = routesTranslations;
  }
  $__Object$defineProperty(Router.prototype, "get", {
    value: function(key) {
      return this._routesMap.get(key);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Router.prototype, "addRoute", {
    value: function(routeKey, route) {
      if (route instanceof RouterRoute) {
        this._addInternalRoute(routeKey, route);
      }
      this._routes.push(route);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Router.prototype, "_addInternalRoute", {
    value: function(routeKey, route) {
      this._routesMap.set(routeKey, route);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Router.prototype, "find", {
    value: function(path) {
      var lang = (arguments[1] !== void 0 ? arguments[1] : 'en');
      path = '/' + path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash, '');
      return this._findRoute(this._routes, path, path, lang);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Router.prototype, "_findRoute", {
    value: function(routes, completePath, path, lang, namedParams) {
      var result;
      routes.some(function(route, index) {
        var routeLang = route.get(lang);
        if (!routeLang) {
          throw new Error('Cannot find routeLang for lang ' + lang + ' and route ' + index);
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
            route.namedParams.forEach(function(paramName) {
              var value = match[group++];
              if (value) {
                namedParams.set(paramName, value);
              }
            });
          }
          result = this._findRoute(route.subRoutes, completePath, restOfThePath, lang, namedParams);
        } else {
          result = this._createRoute(completePath, lang, route, match, groupCount, namedParams);
        }
        return true;
      }.bind(this));
      return result;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Router.prototype, "_createRoute", {
    value: function(completePath, lang, route, match, groupCount, namedParams) {
      var group = 0;
      var extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];
      var controller = route.controller,
          action = route.action;
      var otherParams;
      if (route.getNamedParamsCount() !== 0) {
        if (!namedParams) {
          namedParams = new Map();
        }
        route.namedParams.forEach(function(paramName) {
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
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Router.prototype, "createLink", {
    value: function(lang, routeKey, params, extension, query, hash) {
      var route = this._routesMap[routeKey];
      var plus = '';
      if (extension) {
        plus = '.' + extension;
      } else if (route.extension) {
        plus = '.' + route.extension;
      }
      var link = route.routes[lang].strf;
      link = S.string.vformat(link, params.map(function(param) {
        this._routesTranslations.translate(param, lang);
      }.bind(this)));
      return (link === '/' ? link : link.replace(regExpEndingSlash, '')) + plus;
    },
    enumerable: false,
    writable: true
  });
  return Router;
}();

//# sourceMappingURL=router.js.map