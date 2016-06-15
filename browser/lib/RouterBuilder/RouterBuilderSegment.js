'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Build a route segment
 */

var RouterBuilderSegment = /**
                            * @function
                           */function () {
    /**
     * @param {RouterBuilder} builder
     * @param {RouterRouteSegment} route
     * @param {RouterRouteSegment} [parent]
    * @function
    */

    function RouterBuilderSegment(builder, route, parent) {
        _classCallCheck(this, RouterBuilderSegment);

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


    _createClass(RouterBuilderSegment, [{
        key: 'add',
        value: /**
                * @function
                * @param routeKey
                * @param routeUrl
                * @param controllerAndActionSeparatedByDot
                * @param options
               */function add(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
            var route = this._createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options);
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

    }, {
        key: '_createRoute',
        value: /**
                * @function
                * @param routeKey
                * @param routeUrl
                * @param controllerAndActionSeparatedByDot
                * @param options
               */function _createRoute(routeKey, routeUrl, controllerAndActionSeparatedByDot, options) {
            return this.builder._createRoute(false, this.route, routeUrl, controllerAndActionSeparatedByDot, options && options.namedParamsDefinition, options && options.routeLangs, options && options.extension);
        }

        /**
         * @param {string} routeKey
         * @param {string} controllerAndActionSeparatedByDot
         * @param {Map} options.namedParamsDefinition
         * @param {Map} options.routeLangs
         * @param {string} options.extension
         */

    }, {
        key: 'defaultRoute',
        value: /**
                * @function
                * @param routeKey
                * @param controllerAndActionSeparatedByDot
                * @param options
               */function defaultRoute(routeKey, controllerAndActionSeparatedByDot, options) {
            var route = this._createRoute(routeKey, '', controllerAndActionSeparatedByDot, options);
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
         * @param {Map} options.namedParamsDefinition
         * @param {Map} options.routeLangs
         * @param {string} options.extension
         */

    }, {
        key: 'default',
        value: /**
                * @function
                * @param routeKey
                * @param controllerAndActionSeparatedByDot
                * @param options
               */function _default(routeKey, controllerAndActionSeparatedByDot, options) {
            return this.defaultRoute(routeKey, controllerAndActionSeparatedByDot, options);
        }

        /**
         * @param {string} routeUrl
         * @param {Map} [options.namedParamsDefinition]
         * @param {Map} [options.routeLangs]
         * @param {Function} buildSegment
         */

    }, {
        key: 'addSegment',
        value: /**
                * @function
                * @param routeUrl
                * @param options
                * @param buildSegment
               */function addSegment(routeUrl, options, buildSegment) {
            if (typeof options === 'function') {
                buildSegment = options;
                options = {};
            }

            var route = this.builder._createRouteSegment(this.route, routeUrl, options.namedParamsDefinition, options.routeLangs);
            var segment = new RouterBuilderSegment(this.builder, route, this.route);
            buildSegment(segment);
            this.builder.router.addRoute(null, route);
        }
    }]);

    return RouterBuilderSegment;
}();

exports.default = RouterBuilderSegment;
//# sourceMappingURL=RouterBuilderSegment.js.map