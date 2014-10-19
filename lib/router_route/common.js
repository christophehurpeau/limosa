/**
 * @class
 */
"use strict";
module.exports = function() {
  var RouterRouteCommon = function RouterRouteCommon(namedParams) {
      this.namedParams = namedParams;
      this.routes = new Map();
  };

  Object.defineProperties(RouterRouteCommon.prototype, {
    getNamedParamsCount: {
      writable: true,

      value: function() {
          return this.namedParams.length;
      }
    },

    get: {
      writable: true,

      value: function(lang) {
          return this.routes.get(lang);
      }
    },

    set: {
      writable: true,

      value: function(lang, route) {
          this.routes.set(lang, route);
      }
    }
  });

  return RouterRouteCommon;
}();
//# sourceMappingURL=../router_route/common.js.map