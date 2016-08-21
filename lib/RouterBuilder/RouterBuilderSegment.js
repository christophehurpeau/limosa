'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _RouterBuilder = require('./RouterBuilder');

var _RouterBuilder2 = _interopRequireDefault(_RouterBuilder);

var _Common = require('../RouterRoute/Common');

var _Common2 = _interopRequireDefault(_Common);

var _Segment = require('../RouterRoute/Segment');

var _Segment2 = _interopRequireDefault(_Segment);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build a route segment
 */
let RouterBuilderSegment = class RouterBuilderSegment {

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
     * @param {Object} [options]
     * @param {Map} [options.namedParamsDefinition]
     * @param {Map} [options.routeLangs]
     * @param {string} [options.extension]
    */
    add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
        const route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
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
        return this.builder._createRoute(routeKey, this.route, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
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

        const route = this.builder._createRouteSegment(this.route, routeUrl, options.namedParamsDefinition, options.routeLangs);
        const segment = new RouterBuilderSegment(this.builder, route, this.route);
        buildSegment(segment);
        this.route.subRoutes.push(route);
    }
};
exports.default = RouterBuilderSegment;
//# sourceMappingURL=RouterBuilderSegment.js.map