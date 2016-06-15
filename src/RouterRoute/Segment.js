import RouterRouteCommon from './Common';
import RouterRoute from './Route';

export default class RouterRouteSegment extends RouterRouteCommon {
    subRoutes: Array<RouterRouteCommon>;

    /**
     * @param {Array} namedParams
     */
    constructor(namedParams) {
        super(namedParams);
        this.subRoutes = [];
    }

    /**
     * Set the segment's default route
     *
     * @param {RouterRoute} defaultRoute
     */
    setDefaultRoute(defaultRoute: RouterRoute) {
        this.defaultRoute = defaultRoute;
    }
}
