"use strict";

var RouterRouteLang = (function () {
  var RouterRouteLang =
  /**
   * @constructs
   * @param {RegExp} regExp
   * @param {String} strf
   */
  function RouterRouteLang(regExp, strf) {
    this.regExp = regExp;
    this.strf = strf == "/" ? "/" : strf.replace(/\/+$/, "");
  };

  RouterRouteLang.prototype.match = function (input) {
    return input.match(this.regExp);
  };

  return RouterRouteLang;
})();

exports["default"] = RouterRouteLang;
//# sourceMappingURL=../RouterRoute/Lang.js.map