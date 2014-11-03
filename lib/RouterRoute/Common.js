/**
 * @class RouterRouteCommon
 */
"use strict";

exports.default = function() {
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

//# sourceMappingURL=../RouterRoute/Common.js.map