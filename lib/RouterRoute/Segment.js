"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

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

  _classProps(RouterRouteSegment, null, {
    setDefaultRoute: {
      writable: true,


      /**
       * Set the segment's default route
       * @param {RouterRoute} defaultRoute
       */
      value: function (defaultRoute) {
        this.defaultRoute = defaultRoute;
      }
    }
  });

  return RouterRouteSegment;
})(RouterRouteCommon);

exports["default"] = RouterRouteSegment;
//# sourceMappingURL=../RouterRoute/Segment.js.map