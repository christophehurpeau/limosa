"use strict";

var _extends = function (child, parent) {
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

var RouterRouteCommon = require('./Common')["default"];
var RouterRouteSegment = (function (RouterRouteCommon) {
  var RouterRouteSegment =
  /**
   * @constructs
   */
  function RouterRouteSegment(namedParams) {
    RouterRouteCommon.call(this, namedParams);
    this.subRoutes = [];
  };

  _extends(RouterRouteSegment, RouterRouteCommon);

  RouterRouteSegment.prototype.setDefaultRoute = function (defaultRoute) {
    this.defaultRoute = defaultRoute;
  };

  return RouterRouteSegment;
})(RouterRouteCommon);

exports["default"] = RouterRouteSegment;
//# sourceMappingURL=../RouterRoute/Segment.js.map