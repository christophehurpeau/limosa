"use strict";
var __moduleName = "route";
var S = require('springbokjs-utils');
var RouterRouteCommon = require('./common');
var RouterRoute = S.extendClass(RouterRouteCommon);
module.exports = RouterRoute;
S.extendPrototype(RouterRoute, {construct: function(controller, action, extension, namedParams) {
    RouterRouteCommon.prototype.construct.call(this, namedParams);
    this.controller = controller;
    this.action = action;
    this.extension = extension;
  }});
