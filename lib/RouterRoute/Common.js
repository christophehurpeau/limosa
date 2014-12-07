"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var RouterRouteCommon = (function () {
  var RouterRouteCommon =
  /**
   * @constructs
   * @param {Array} namedParams
   */
  function RouterRouteCommon(namedParams) {
    this.namedParams = namedParams;
    this.routes = new Map();
  };

  _classProps(RouterRouteCommon, null, {
    getNamedParamsCount: {
      writable: true,


      /**
       * @return {int}
       */
      value: function () {
        return this.namedParams.length;
      }
    },
    get: {
      writable: true,


      /**
       * @param {String} lang
       * @return {RouterRouteLang}
       */
      value: function (lang) {
        return this.routes.get(lang);
      }
    },
    set: {
      writable: true,


      /**
       * @param {String} lang
       * @param {RouterRouteLang} route
       */
      value: function (lang, route) {
        this.routes.set(lang, route);
      }
    }
  });

  return RouterRouteCommon;
})();

exports["default"] = RouterRouteCommon;
//# sourceMappingURL=../RouterRoute/Common.js.map