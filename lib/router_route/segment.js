"use strict";
var $__Object$getPrototypeOf = Object.getPrototypeOf;
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var RouterRouteCommon = require('./common');
module.exports = function($__super) {
  function RouterRouteSegment(namedParams) {
    $__Object$getPrototypeOf(RouterRouteSegment.prototype).constructor.call(this, namedParams);
    this.subRoutes = [];
  }
  RouterRouteSegment.__proto__ = ($__super !== null ? $__super : Function.prototype);
  RouterRouteSegment.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));
  $__Object$defineProperty(RouterRouteSegment.prototype, "constructor", {value: RouterRouteSegment});
  $__Object$defineProperty(RouterRouteSegment.prototype, "setDefaultRoute", {
    value: function(defaultRoute) {
      this.defaultRoute = defaultRoute;
    },
    enumerable: false,
    writable: true
  });
  return RouterRouteSegment;
}(RouterRouteCommon);
