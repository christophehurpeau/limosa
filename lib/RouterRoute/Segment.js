'use strict';

var _get = require('babel-runtime/helpers/get').default;

var _inherits = require('babel-runtime/helpers/inherits').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

/** @class RouterRouteSegment 
* @param namedParams */
let RouterRouteSegment = (function (_RouterRouteCommon) {
    _inherits(RouterRouteSegment, _RouterRouteCommon);

    function RouterRouteSegment(namedParams) {
        _classCallCheck(this, RouterRouteSegment);

        _get(Object.getPrototypeOf(RouterRouteSegment.prototype), 'constructor', this).call(this, namedParams);
        this.subRoutes = [];
    }

    /**
     * Set the segment's default route
     *
     * @param {RouterRoute} defaultRoute
     
    * @memberof RouterRouteSegment 
    * @instance 
    * @method setDefaultRoute 
    * @param defaultRoute */

    _createClass(RouterRouteSegment, [{
        key: 'setDefaultRoute',
        value: function setDefaultRoute(defaultRoute) {
            this.defaultRoute = defaultRoute;
        }
    }]);

    return RouterRouteSegment;
})(_Common2.default);

exports.default = RouterRouteSegment;
module.exports = exports.default;
//# sourceMappingURL=Segment.js.map