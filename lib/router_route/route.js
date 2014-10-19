"use strict";
var RouterRouteCommon = require('./common');

/**
 * @constructor
 */
module.exports = function(RouterRouteCommon) {
  var RouterRoute = function RouterRoute(controller, action, extension, namedParams) {
      RouterRouteCommon.call(this, namedParams);
      this.controller = controller;
      this.action = action;
      this.extension = extension;
  };

  RouterRoute.prototype = Object.create(RouterRouteCommon.prototype, {
    constructor: {
      value: RouterRoute,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  RouterRoute.__proto__ = RouterRouteCommon;
  return RouterRoute;
}(RouterRouteCommon);
//# sourceMappingURL=../router_route/route.js.map