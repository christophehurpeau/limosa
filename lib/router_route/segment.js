"use strict";
var __moduleName = "segment";
var RouterRouteCommon = require('./common');
var RouterRouteSegment = RouterRouteCommon.extend();
module.exports = RouterRouteSegment;
RouterRouteSegment.extendPrototype({
  construct: function() {
    RouterRouteCommon.prototype.construct.apply(this, arguments);
    this.subRoutes = [];
  },
  setDefaultRoute: function(defaultRoute) {
    this.defaultRoute = defaultRoute;
  }
});
