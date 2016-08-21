'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

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

var RouterRoute = /**
                   * @function
                   * @param _RouterRouteCommon
                  */function (_RouterRouteCommon) {
    _inherits(RouterRoute, _RouterRouteCommon);

    /**
     * @param {string} key
     * @param {string} controller
     * @param {string} action
     * @param {string} [extension]
     * @param {Array} namedParams
    * @function
    */

    function RouterRoute(key, controller, action, extension, namedParams) {
        _classCallCheck(this, RouterRoute);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RouterRoute).call(this, namedParams));

        _this.key = key;
        _this.controller = controller;
        _this.action = action;
        _this.extension = extension;
        return _this;
    }

    return RouterRoute;
}(_Common2.default);

exports.default = RouterRoute;
//# sourceMappingURL=Route.js.map