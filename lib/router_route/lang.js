"use strict";
var $__Object$defineProperty = Object.defineProperty;
module.exports = function() {
  "use strict";
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

//# sourceMappingURL=../router_route/lang.js.map