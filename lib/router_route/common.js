"use strict";
var $__Object$defineProperty = Object.defineProperty;
module.exports = function() {
  function RouterRouteCommon(namedParams) {
    this.namedParams = namedParams;
    this.routes = new Map();
  }
  $__Object$defineProperty(RouterRouteCommon.prototype, "getNamedParamsCount", {
    value: function() {
      return this.namedParams.length;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(RouterRouteCommon.prototype, "get", {
    value: function(lang) {
      return this.routes.get(lang);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(RouterRouteCommon.prototype, "set", {
    value: function(lang, route) {
      this.routes.set(lang, route);
    },
    enumerable: false,
    writable: true
  });
  return RouterRouteCommon;
}();
