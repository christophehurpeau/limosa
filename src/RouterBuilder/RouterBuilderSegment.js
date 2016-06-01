/**
 * Build a route segment
 */
export default class RouterBuilderSegment {
    /**
     * @param {RouterBuilder} builder
     * @param {RouterRouteSegment} route
     * @param {RouterRouteSegment} [parent]
     */
    constructor(builder, route, parent) {
        this.builder = builder;
        this.route = route;
        this.parent = parent;
    }

    /**
     * @param {string} routeKey
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
     */
    add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(
            routeKey,
            routeUrl,
            controllerAndActionSeparatedByDot,
            options
        );
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
    }

    /**
     * @param {string} routeKey
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
     */
    _createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        return this.builder._createRoute(false, this.route, routeUrl,
            controllerAndActionSeparatedByDot,
            options && options.namedParamsDefinition,
            options && options.routeLangs,
            options && options.extension);
    }

    /**
     * @param {string} routeKey
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
     */
    defaultRoute(routeKey, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
        // this.route.defaultRoute = route;
        // this.builder.router._addInternalRoute(routeKey, route);
        this.route.subRoutes.push(route);
        this.builder.router._addInternalRoute(routeKey, route);
        return this;
    }

    /**
     * @param {string} routeUrl
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {Function} buildSegment
     */
    addSegment(routeUrl, options, buildSegment) {
        if (typeof options === 'function') {
            buildSegment = options;
            options = {};
        }

        const route = this.builder._createRouteSegment(this.route, routeUrl,
            options.namedParamsDefinition, options.routeLangs);
        const segment = new RouterBuilderSegment(this.buider, route, this.route);
        buildSegment(segment);
        this.router.addRoute(null, route);
    }
}
