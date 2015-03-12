"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @class Route
 */
var Route =
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
  Object.freeze(this);
};

module.exports = Route;
//# sourceMappingURL=Route.js.map