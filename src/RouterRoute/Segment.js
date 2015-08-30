import RouterRouteCommon from './Common';

export default class RouterRouteSegment extends RouterRouteCommon {
    constructor(namedParams) {
        super(namedParams);
        this.subRoutes = [];
    }

    /**
     * Set the segment's default route
     *
     * @param {RouterRoute} defaultRoute
     */
    setDefaultRoute(defaultRoute) {
        this.defaultRoute = defaultRoute;
    }
}