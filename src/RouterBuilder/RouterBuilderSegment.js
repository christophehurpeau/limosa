import RouterBuilder from './RouterBuilder';
import RouterRouteCommon from '../RouterRoute/Common';
import RouterRouteSegment from '../RouterRoute/Segment';

/**
 * Build a route segment
 */
export default class RouterBuilderSegment {
    builder: RouterBuilder;
    route: RouterRouteSegment;
    parent: ?RouterRouteCommon;

    /**
     * @param {RouterBuilder} builder
     * @param {RouterRouteSegment} route
     * @param {RouterRouteSegment} [parent]
     */
    constructor(builder: RouterBuilder, route: RouterRouteSegment, parent: ?RouterRouteCommon) {
        this.builder = builder;
        this.route = route;
        this.parent = parent;
    }

    /**
     * @param {string} routeKey
     * @param {string} routeUrl
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Object} [options]
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {string} [options.extension]
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
     * @param {Object} [options]
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {string} [options.extension]
     */
    _createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        return this.builder._createRoute(routeKey, this.route, routeUrl,
            controllerAndActionSeparatedByDot,
            options && options.namedParamsDefinition,
            options && options.routeLangs,
            options && options.extension);
    }

    /**
     * @param {string} routeKey
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Object} [options]
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {string} [options.extension]
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
     * Alias for defaultRoute
     *
     * @param {string} routeKey
     * @param {string} controllerAndActionSeparatedByDot
     * @param {Object} [options]
     * @param {Map} options.namedParamsDefinition
     * @param {Map} options.routeLangs
     * @param {string} options.extension
     */
    default(routeKey, controllerAndActionSeparatedByDot, options) {
        return this.defaultRoute(routeKey, controllerAndActionSeparatedByDot, options);
    }

    /**
     * @param {string} routeUrl
     * @param {Object} [options]
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
        const segment = new RouterBuilderSegment(this.builder, route, this.route);
        buildSegment(segment);
        this.route.subRoutes.push(route);
    }
}
