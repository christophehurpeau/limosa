import RouterRouteCommon from './Common';

/**
 * @class RouterRouteSegment
 */
export default class RouterRouteSegment extends RouterRouteCommon {
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
}
