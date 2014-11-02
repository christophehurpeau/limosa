"use strict";
require('springbokjs-shim/es6');
var S = require('springbokjs-utils');

var RouterRoute = require('./RouterRoute/Route').default;
var RouterRouteSegment = require('./RouterRoute/Segment').default;
var Route = require('./Route').default;

var regExpStartingSlash = /^\/+/;
var regExpEndingSlash = /\/+$/;

exports.default = function() {
  var Router = function Router(routesTranslations) {
      this._routesMap = new Map();
      this._routes = [];
      this._routesTranslations = routesTranslations;
  };

  Object.defineProperties(Router.prototype, {
    get: {
      writable: true,

      value: function(key) {
          return this._routesMap.get(key);
      }
    },

    addRoute: {
      writable: true,

      value: function(routeKey, route) {
          if (route instanceof RouterRoute) {
              this._addInternalRoute(routeKey, route);
          }
          this._routes.push(route);
      }
    },

    _addInternalRoute: {
      writable: true,

      value: function(routeKey, route) {
          this._routesMap.set(routeKey, route);
      }
    },

    find: {
      writable: true,

      value: function(path, lang) {
        if (lang === undefined)
          lang = 'en';

        path = '/' + path.trim().replace(regExpStartingSlash, '').replace(regExpEndingSlash,'');
        return this._findRoute(this._routes, path, path, lang);
      }
    },

    _findRoute: {
      writable: true,

      value: function(routes, completePath, path, lang, namedParams) {
        var _this = this;
        var result;
        routes.some(function(route, index) {
            var /*RouterRouteLang*/ routeLang = route.get(lang);
            if (!routeLang) {
                throw new Error('Cannot find routeLang for lang ' + lang + ' and route ' + index);
            }
            if (_this.logger) {
                _this.logger.info('[springbokjs-router] trying ' + routeLang.regExp);
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
                    route.namedParams.forEach(function(paramName) {
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
      }
    },

    _createRoute: {
      writable: true,

      value: function(completePath, lang, route, match, groupCount, namedParams) {
          var group = 0;
          var extension = groupCount === 0 || !route.extension ? undefined : match[--groupCount];

          var controller = route.controller, action = route.action;

          var otherParams;

          if (route.getNamedParamsCount() !== 0) {
              // set params
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
              // Replace controller and action if needed
              if (namedParams.has('controller')) {
                  controller = this._routesTranslations.untranslate(namedParams.get('controller'), lang);
                  // Should we remove it ?
                  namedParams.delete('controller');
              }
              if (namedParams.has('action')) {
                  action = this._routesTranslations.untranslate(namedParams.get('action'), lang);
                  // Should we remove it ?
                  namedParams.delete('action');
              }

              if (!namedParams.size) {
                  namedParams = undefined;
              }
          }

          // The only not-named param can be /*
          if (group+1 === groupCount && match[group]) {
              otherParams = match[group].split('/');
          }

          return new Route(completePath, controller, action, namedParams, otherParams, extension);
      }
    },

    createLink: {
      writable: true,

      value: function(lang, routeKey, params, extension, query, hash) {
        var _this2 = this;
        var route = this._routesMap[routeKey];
        var plus = '';
        if (extension) {
            plus = '.' + extension;
        } else if (route.extension) {
            plus = '.' + route.extension;
        }

        var link = route.routes[lang].strf;
        link = S.string.vformat(link, params.map(function(param) { _this2._routesTranslations.translate(param, lang); }));
        return (link === '/' ? link : link.replace(regExpEndingSlash, '')) + plus;
      }
    }
  });

  return Router;
}();

//# sourceMappingURL=Router.js.map