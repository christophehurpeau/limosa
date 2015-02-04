"use strict";

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

  RouterRouteCommon.prototype.getNamedParamsCount = function () {
    return this.namedParams.length;
  };

  RouterRouteCommon.prototype.get = function (lang) {
    return this.routes.get(lang);
  };

  RouterRouteCommon.prototype.set = function (lang, route) {
    this.routes.set(lang, route);
  };

  return RouterRouteCommon;
})();

exports["default"] = RouterRouteCommon;
//# sourceMappingURL=../RouterRoute/Common.js.map