"use strict";
var RouterRouteCommon = require('./common');

/**
 * @class
 */
module.exports = function(RouterRouteCommon) {
  var RouterRouteSegment = function RouterRouteSegment(namedParams) {
      RouterRouteCommon.call(this, namedParams);
      this.subRoutes = [];
  };

  RouterRouteSegment.prototype = Object.create(RouterRouteCommon.prototype, {
    constructor: {
      value: RouterRouteSegment,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  RouterRouteSegment.__proto__ = RouterRouteCommon;

  Object.defineProperties(RouterRouteSegment.prototype, {
    setDefaultRoute: {
      writable: true,

      value: function(defaultRoute) {
          this.defaultRoute = defaultRoute;
      }
    }
  });

  return RouterRouteSegment;
}(RouterRouteCommon);
//# sourceMappingURL=../router_route/segment.js.map