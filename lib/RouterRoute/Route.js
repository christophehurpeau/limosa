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
var RouterRoute = (function (RouterRouteCommon) {
  var RouterRoute =
  /**
   * @constructs
   */
  function RouterRoute(controller, action, extension, namedParams) {
    RouterRouteCommon.call(this, namedParams);
    this.controller = controller;
    this.action = action;
    this.extension = extension;
  };

  _extends(RouterRoute, RouterRouteCommon);

  return RouterRoute;
})(RouterRouteCommon);

exports["default"] = RouterRoute;
//# sourceMappingURL=../RouterRoute/Route.js.map