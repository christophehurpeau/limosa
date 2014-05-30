"use strict";
var $__Object$defineProperty = Object.defineProperty;
module.exports = function() {
  function RouterRouteLang(regExp, strf) {
    this.regExp = regExp;
    this.strf = strf == '/' ? '/' : strf.replace(/\/+$/, '');
  }
  $__Object$defineProperty(RouterRouteLang.prototype, "match", {
    value: function(input) {
      return input.match(this.regExp);
    },
    enumerable: false,
    writable: true
  });
  return RouterRouteLang;
}();
