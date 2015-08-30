'use strict';

var _get = require('babel-runtime/helpers/get').default;

var _inherits = require('babel-runtime/helpers/inherits').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Common = require('./Common');

var _Common2 = _interopRequireDefault(_Common);

/** @class RouterRoute 
* @param controller 
* @param action 
* @param extension 
* @param namedParams */
let RouterRoute = (function (_RouterRouteCommon) {
    _inherits(RouterRoute, _RouterRouteCommon);

    function RouterRoute(controller, action, extension, namedParams) {
        _classCallCheck(this, RouterRoute);

        _get(Object.getPrototypeOf(RouterRoute.prototype), 'constructor', this).call(this, namedParams);
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }

    return RouterRoute;
})(_Common2.default);

exports.default = RouterRoute;
module.exports = exports.default;
//# sourceMappingURL=Route.js.map