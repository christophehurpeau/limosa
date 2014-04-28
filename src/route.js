var S = require('springbokjs-utils');

/**
 * @class
 */
var Route = S.newClass();
module.exports = Route;

Route.extendPrototype( /** @lends Route.prototype */ {
    /**
     * @constructs
     * @param {String} all
     * @param {String} controller
     * @param {String} action
     * @param {Object} namedParams
     * @param {Array} otherParams
     * @param {String} extension
     */
    construct(all, controller, action, namedParams, otherParams, extension) {
        this.all = all;
        this.controller = controller;
        this.action = action;
        this.namedParams = namedParams;
        this.otherParams = otherParams;
        this.extension = extension;
        Object.freeze(this);
    },
});