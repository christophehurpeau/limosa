'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @function
 * @param self
 * @param call
*/
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

/**
 * @function
 * @param subClass
 * @param superClass
*/
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterRouteSegment = /**
                          * @function
                          * @param _RouterRouteCommon
                         */function (_RouterRouteCommon) {
    _inherits(RouterRouteSegment, _RouterRouteCommon);

    /**
     * @param {Array} namedParams
    * @function
    */

    function RouterRouteSegment(namedParams) {
        _classCallCheck(this, RouterRouteSegment);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RouterRouteSegment).call(this, namedParams));

        _this.subRoutes = [];
        return _this;
    }

    /**
     * Set the segment's default route
     *
     * @param {RouterRoute} defaultRoute
     */


    _createClass(RouterRouteSegment, [{
        key: 'setDefaultRoute',
        value: /**
                * @function
                * @param {RouterRoute} defaultRoute
               */function setDefaultRoute(defaultRoute) {
            this.defaultRoute = defaultRoute;
        }
    }]);

    return RouterRouteSegment;
}(_Common2.default);

exports.default = RouterRouteSegment;
//# sourceMappingURL=Segment.js.map