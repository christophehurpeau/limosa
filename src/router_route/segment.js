//var S = require('springbokjs-utils');
var RouterRouteCommon = require('./common');

/**
 * @class
 */
var RouterRouteSegment = RouterRouteCommon.extend();
module.exports = RouterRouteSegment;

RouterRouteSegment.extendPrototype(/** @lends RouterRouteSegment.prototype */{
    /**
     * @constructs
     */
    construct() {
        RouterRouteCommon.prototype.construct.apply(this, arguments);
        this.subRoutes = [];
    },

    /**
     * Set the segment's default route
     * @param {RouterRoute} defaultRoute
     */
    setDefaultRoute(defaultRoute) {
        this.defaultRoute = defaultRoute;
    }
});