"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route =
/**
 * @param {string} all
 * @param {string} controller
 * @param {string} action
 * @param {Map} namedParams
 * @param {Array} otherParams
 * @param {string} extension
* @function
*/
function Route(all, controller, action, namedParams, otherParams, extension) {
    _classCallCheck(this, Route);

    this.all = all;
    this.controller = controller;
    this.action = action;
    this.namedParams = namedParams;
    this.otherParams = otherParams;
    this.extension = extension;
    Object.freeze(this);
};

exports.default = Route;
//# sourceMappingURL=Route.js.map