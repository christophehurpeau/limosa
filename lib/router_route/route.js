"use strict";
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var $__Object$getPrototypeOf = Object.getPrototypeOf;
var RouterRouteCommon = require('./common');
module.exports = function($__super) {
  "use strict";
  function RouterRoute(controller, action, extension, namedParams) {
    $__Object$getPrototypeOf(RouterRoute.prototype).constructor.call(this, namedParams);
    this.controller = controller;
    this.action = action;
    this.extension = extension;
  }
  RouterRoute.__proto__ = ($__super !== null ? $__super : Function.prototype);
  RouterRoute.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));
  $__Object$defineProperty(RouterRoute.prototype, "constructor", {value: RouterRoute});
  return RouterRoute;
}(RouterRouteCommon);

//# sourceMappingURL=../router_route/route.js.map