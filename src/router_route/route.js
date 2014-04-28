var S = require('springbokjs-utils');
var RouterRouteCommon = require('./common');

/**
 * @constructor
 */
var RouterRoute = S.extendClass(RouterRouteCommon);
module.exports = RouterRoute;

S.extendPrototype(RouterRoute, /** @lends RouterRoute.prototype */{
    /**
     * @constructs
     */
    construct(controller, action, extension, namedParams) {
        RouterRouteCommon.prototype.construct.call(this, namedParams);
        this.controller = controller;
        this.action = action;
        this.extension = extension;
    }
});