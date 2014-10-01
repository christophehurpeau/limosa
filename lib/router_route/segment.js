"use strict";
var $__Object$defineProperties = Object.defineProperties;
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var $__Object$getPrototypeOf = Object.getPrototypeOf;
var RouterRouteCommon = require('./common');
module.exports = function($__super) {
  "use strict";
  function RouterRouteSegment(namedParams) {
    $__Object$getPrototypeOf(RouterRouteSegment.prototype).constructor.call(this, namedParams);
    this.subRoutes = [];
  }
  RouterRouteSegment.__proto__ = ($__super !== null ? $__super : Function.prototype);
  RouterRouteSegment.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));
  $__Object$defineProperty(RouterRouteSegment.prototype, "constructor", {value: RouterRouteSegment});
  $__Object$defineProperties(RouterRouteSegment.prototype, {setDefaultRoute: {
      value: function(defaultRoute) {
        this.defaultRoute = defaultRoute;
      },
      enumerable: false,
      writable: true
    }});
  return RouterRouteSegment;
}(RouterRouteCommon);

//# sourceMappingURL=../router_route/segment.js.map