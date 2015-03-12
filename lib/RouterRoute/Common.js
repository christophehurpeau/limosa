"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @class RouterRouteCommon
 */
var RouterRouteCommon = (function () {
  /**
   * @constructs
   * @param {Array} namedParams
   */
  function RouterRouteCommon(namedParams) {
    _classCallCheck(this, RouterRouteCommon);

    this.namedParams = namedParams;
    this.routes = new Map();
  }

  _prototypeProperties(RouterRouteCommon, null, {
    getNamedParamsCount: {

      /**
       * @return {int}
       */
      value: function getNamedParamsCount() {
        return this.namedParams.length;
      },
      writable: true,
      configurable: true
    },
    get: {

      /**
       * @param {String} lang
       * @return {RouterRouteLang}
       */
      value: function get(lang) {
        return this.routes.get(lang);
      },
      writable: true,
      configurable: true
    },
    set: {

      /**
       * @param {String} lang
       * @param {RouterRouteLang} route
       */
      value: function set(lang, route) {
        this.routes.set(lang, route);
      },
      writable: true,
      configurable: true
    }
  });

  return RouterRouteCommon;
})();

module.exports = RouterRouteCommon;
//# sourceMappingURL=../RouterRoute/Common.js.map