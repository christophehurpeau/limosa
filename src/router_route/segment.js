var RouterRouteCommon = require('./common');

/**
 * @class
 */
module.exports = class RouterRouteSegment extends RouterRouteCommon {
    /**
     * @constructs
     */
    constructor(namedParams) {
        super(namedParams);
        this.subRoutes = [];
    }

    /**
     * Set the segment's default route
     * @param {RouterRoute} defaultRoute
     */
    setDefaultRoute(defaultRoute) {
        this.defaultRoute = defaultRoute;
    }
};