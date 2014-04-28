"use strict";
var __moduleName = "lang";
var S = require('springbokjs-utils');
var RouterRouteLang = S.newClass();
module.exports = RouterRouteLang;
RouterRouteLang.extendPrototype({
  construct: function(regExp, strf) {
    this.regExp = regExp;
    this.strf = strf == '/' ? '/' : strf.replace(/\/+$/, '');
  },
  match: function(input) {
    return input.match(this.regExp);
  }
});
