/**
 * @class RouterRouteLang
 */
"use strict";

exports.default = function() {
  var RouterRouteLang = function RouterRouteLang(regExp, strf) {
      this.regExp = regExp;
      this.strf = strf == '/' ? '/' : strf.replace(/\/+$/, '');
  };

  Object.defineProperties(RouterRouteLang.prototype, {
    match: {
      writable: true,

      value: function(input) {
          return input.match(this.regExp);
      }
    }
  });

  return RouterRouteLang;
}();

//# sourceMappingURL=../RouterRoute/Lang.js.map