'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RouterRouteSegment = class RouterRouteSegment extends _Common2.default {

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
    setDefaultRoute(defaultRoute) {
        this.defaultRoute = defaultRoute;
    }
};
exports.default = RouterRouteSegment;
//# sourceMappingURL=Segment.js.map