"use strict";

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
  this.all = all;
  this.controller = controller;
  this.action = action;
  this.namedParams = namedParams;
  this.otherParams = otherParams;
  this.extension = extension;
  Object.freeze(this);
};

exports["default"] = Route;
//# sourceMappingURL=Route.js.map