"use strict";
var $__Object$defineProperties = Object.defineProperties;
module.exports = function() {
  "use strict";
  function RouterRouteCommon(namedParams) {
    this.namedParams = namedParams;
    this.routes = new Map();
  }
  $__Object$defineProperties(RouterRouteCommon.prototype, {
    getNamedParamsCount: {
      value: function() {
        return this.namedParams.length;
      },
      enumerable: false,
      writable: true
    },
    get: {
      value: function(lang) {
        return this.routes.get(lang);
      },
      enumerable: false,
      writable: true
    },
    set: {
      value: function(lang, route) {
        this.routes.set(lang, route);
      },
      enumerable: false,
      writable: true
    }
  });
  return RouterRouteCommon;
}();

//# sourceMappingURL=../router_route/common.js.map