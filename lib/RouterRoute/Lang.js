"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @class RouterRouteLang
 */
var RouterRouteLang = (function () {
  /**
   * @constructs
   * @param {RegExp} regExp
   * @param {String} strf
   */
  function RouterRouteLang(regExp, strf) {
    _classCallCheck(this, RouterRouteLang);

    this.regExp = regExp;
    this.strf = strf == "/" ? "/" : strf.replace(/\/+$/, "");
  }

  _prototypeProperties(RouterRouteLang, null, {
    match: {

      /**
       *
       * @return {Array} [description]
       */
      value: function match(input) {
        return input.match(this.regExp);
      },
      writable: true,
      configurable: true
    }
  });

  return RouterRouteLang;
})();

module.exports = RouterRouteLang;
//# sourceMappingURL=../RouterRoute/Lang.js.map