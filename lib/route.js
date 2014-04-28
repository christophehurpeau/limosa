"use strict";
var __moduleName = "route";
var S = require('springbokjs-utils');
var Route = S.newClass();
module.exports = Route;
Route.extendPrototype({construct: function(all, controller, action, namedParams, otherParams, extension) {
    this.all = all;
    this.controller = controller;
    this.action = action;
    this.namedParams = namedParams;
    this.otherParams = otherParams;
    this.extension = extension;
    Object.freeze(this);
  }});
