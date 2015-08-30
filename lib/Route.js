"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check").default;

var _Object$freeze = require("babel-runtime/core-js/object/freeze").default;

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @class Route 
* @param all 
* @param controller 
* @param action 
* @param namedParams 
* @param otherParams 
* @param extension */
let Route =
/**
 * @param {String} all
 * @param {String} controller
 * @param {String} action
 * @param {Map} namedParams
 * @param {Array} otherParams
 * @param {String} extension
 */
function Route(all, controller, action, namedParams, otherParams, extension) {
    _classCallCheck(this, Route);

    this.all = all;
    this.controller = controller;
    this.action = action;
    this.namedParams = namedParams;
    this.otherParams = otherParams;
    this.extension = extension;
    _Object$freeze(this);
};

exports.default = Route;
module.exports = exports.default;
//# sourceMappingURL=Route.js.map