"use strict";
var __moduleName = "common";
var S = require('springbokjs-utils');
var RouterRouteCommon = S.newClass();
module.exports = RouterRouteCommon;
RouterRouteCommon.extendPrototype({
  construct: function(namedParams) {
    this.namedParams = namedParams;
    this.routes = new Map();
  },
  getNamedParamsCount: function() {
    return this.namedParams.length;
  },
  get: function(lang) {
    return this.routes[lang];
  },
  set: function(lang, route) {
    this.routes[lang] = route;
  }
});
