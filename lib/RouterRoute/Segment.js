"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var RouterRouteCommon = _interopRequire(require("./Common"));

/**
 * @class RouterRouteSegment
 */
var RouterRouteSegment = (function (RouterRouteCommon) {
  /**
   * @constructs
   */
  function RouterRouteSegment(namedParams) {
    _classCallCheck(this, RouterRouteSegment);

    _get(Object.getPrototypeOf(RouterRouteSegment.prototype), "constructor", this).call(this, namedParams);
    this.subRoutes = [];
  }

  _inherits(RouterRouteSegment, RouterRouteCommon);

  _prototypeProperties(RouterRouteSegment, null, {
    setDefaultRoute: {

      /**
       * Set the segment's default route
       * @param {RouterRoute} defaultRoute
       */
      value: function setDefaultRoute(defaultRoute) {
        this.defaultRoute = defaultRoute;
      },
      writable: true,
      configurable: true
    }
  });

  return RouterRouteSegment;
})(RouterRouteCommon);

module.exports = RouterRouteSegment;
//# sourceMappingURL=../RouterRoute/Segment.js.map