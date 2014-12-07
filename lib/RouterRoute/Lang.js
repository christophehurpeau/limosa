"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

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

  _classProps(RouterRouteLang, null, {
    match: {
      writable: true,


      /**
       *
       * @return {Array} [description]
       */
      value: function (input) {
        return input.match(this.regExp);
      }
    }
  });

  return RouterRouteLang;
})();

exports["default"] = RouterRouteLang;
//# sourceMappingURL=../RouterRoute/Lang.js.map