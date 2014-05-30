"use strict";
module.exports = function() {
  function Route(all, controller, action, namedParams, otherParams, extension) {
    this.all = all;
    this.controller = controller;
    this.action = action;
    this.namedParams = namedParams;
    this.otherParams = otherParams;
    this.extension = extension;
    Object.freeze(this);
  }
  return Route;
}();
