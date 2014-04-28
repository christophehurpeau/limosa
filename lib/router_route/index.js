"use strict";
var __moduleName = "index";
var S = require('springbokjs-utils');
var RouterRouteCommon = require('./common');
var RouterRoute = S.extendClass(RouterRouteCommon);
module.exports = RouterRoute;
S.extendPrototype(RouterRoute, {construct: function(controller, action, extension, namedParams) {
    RouterRouteCommon.prototype.construct.call(this, namedParams);
    this.constroller = controller;
    this.action = action;
    this.extension = extension;
  }});
