"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var RouterRouteCommon = _interopRequire(require("./Common"));

/**
 * @constructor RouterRoute
 */
var RouterRoute = (function (RouterRouteCommon) {
    /**
     * @constructs
     */
    function RouterRoute(controller, action, extension, namedParams) {
        _classCallCheck(this, RouterRoute);

        _get(Object.getPrototypeOf(RouterRoute.prototype), "constructor", this).call(this, namedParams);
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }

    _inherits(RouterRoute, RouterRouteCommon);

    return RouterRoute;
})(RouterRouteCommon);

module.exports = RouterRoute;
//# sourceMappingURL=../RouterRoute/Route.js.map