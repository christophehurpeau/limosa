/**
 * @class
 */
"use strict";

exports.default = function() {
  var Route = function Route(all, controller, action, namedParams, otherParams, extension) {
      this.all = all;
      this.controller = controller;
      this.action = action;
      this.namedParams = namedParams;
      this.otherParams = otherParams;
      this.extension = extension;
      Object.freeze(this);
  };

  return Route;
}();

//# sourceMappingURL=Route.js.map