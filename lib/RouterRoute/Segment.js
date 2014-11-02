"use strict";

var _extends = function(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  child.__proto__ = parent;
};

var RouterRouteCommon = require('./Common').default;

exports.default = function(RouterRouteCommon) {
  var RouterRouteSegment = function RouterRouteSegment(namedParams) {
      RouterRouteCommon.call(this, namedParams);
      this.subRoutes = [];
  };

  _extends(RouterRouteSegment, RouterRouteCommon);

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

//# sourceMappingURL=../RouterRoute/Segment.js.map